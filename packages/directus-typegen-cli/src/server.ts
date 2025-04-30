import { createCommand, createOption } from '@commander-js/extra-typings';
import { writeFileSync } from 'fs';
import { generateTypesFromSnapshotParsed, toDirectusSnapshot, type DirectusSnapshot } from '@ikerin/directus-typegen';
import { stdout } from 'process';
import {
  createDirectus,
  rest,
  readCollections,
  readFields,
  readRelations,
  staticToken,
  authentication,
} from '@directus/sdk';

const parseHeader = (header: string, previous: Record<string, string>) => {
  const [name, value] = header.split(':').map((s) => s.trim());
  return { ...previous, [name]: value };
};

const parseAuth = (auth: string): { user: string; password: string } => {
  const [user, password] = auth.split(':');
  return { user, password };
};

/**
 * Remove all built in collections and only keep user defined (non-system) collections
 * as well as system collections that have custom fields defined
 * this is the output that we get from snapshot api of directus too, so we are trying to mimic it
 *
 * @param snapshot - The snapshot of the directus instance
 * @returns The cleaned snapshot
 */
const cleanSnapshot = (snapshot: DirectusSnapshot): DirectusSnapshot => {
  const systemCollectionsWithCustomFields = snapshot.collections.filter((collection) =>
    snapshot.fields.some((field) => field.collection === collection.collection && !field.meta?.system),
  );

  const collections = snapshot.collections
    .filter((collection) => !collection.meta?.system)
    .concat(systemCollectionsWithCustomFields);

  const fields = snapshot.fields.filter((field) => {
    const collection = collections.find((collection) => collection.collection === field.collection);
    return collection ? (collection.meta?.system ? !field.meta?.system : true) : false;
  });

  const relations = snapshot.relations.filter((relation) =>
    collections.some((collection) => collection.collection === relation.collection),
  );

  return { collections, fields, relations };
};

export default function server() {
  return createCommand('server')
    .description('Generate Directus SDK TypeScript types from a running directus instance')
    .requiredOption('-l, --url <url>', 'The URL of the directus instance')
    .option('-h, --header <header>', 'The header to use to authenticate with the directus instance', parseHeader, {})
    .addOption(
      createOption(
        '-u, --user <user:password>',
        'The user and password to use to authenticate with the directus instance (mimics curl basic auth)',
      )
        .env('DIRECTUS_AUTH')
        .argParser(parseAuth),
    )
    .addOption(
      createOption('-t, --token <token>', 'The token to use to authenticate with the directus instance').env(
        'DIRECTUS_TOKEN',
      ),
    )
    .option('-o, --output <file>', 'Output TypeScript file. If not provided, writes to stdout')
    .action(async (options) => {
      try {
        let directus = createDirectus(options.url).with(rest()).with(authentication());

        if (options.token) {
          directus = directus.with(staticToken(options.token));
        } else if (options.user) {
          await directus.login(options.user.user, options.user.password);
        } else if (options.header) {
          directus = directus.with(rest({ onRequest: (req) => ({ ...req, headers: options.header }) }));
        }

        const [collections, fields, relations] = await Promise.all([
          directus.request(readCollections()),
          directus.request(readFields()),
          directus.request(readRelations()),
        ]);

        directus.stopRefreshing();

        const snapshot = toDirectusSnapshot({ collections, fields, relations });
        const cleanedSnapshot = cleanSnapshot(snapshot);
        const types = generateTypesFromSnapshotParsed(cleanedSnapshot);

        writeFileSync(options.output ?? stdout.fd, types, 'utf-8');

        if (options.output) {
          console.log(`Types generated successfully to ${options.output}`);
        }
      } catch (error) {
        console.error('Error generating types:', error);
        process.exit(1);
      }
    });
}
