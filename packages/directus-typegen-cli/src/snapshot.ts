import { createCommand } from '@commander-js/extra-typings';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { text } from 'stream/consumers';
import { generateTypesFromSnapshot } from '@ikerin/directus-typegen';
import { stdin, stdout } from 'process';
import YAML from 'yaml';

const checkIfFileExists = (value: string) => {
  if (!existsSync(value)) {
    throw new Error(`Input file ${value} does not exist`);
  }

  return value;
};

export default function snapshot() {
  return createCommand('snapshot')
    .description('Generate TypeScript types from a schema snapshot')
    .option('-i, --input <file>', 'Input schema file. If not provided, reads from stdin', checkIfFileExists)
    .option('-o, --output <file>', 'Output TypeScript file. If not provided, writes to stdout')
    .option('-j, --json', 'Treat input as JSON (default: YAML)')
    .action(async (options) => {
      try {
        const content = readFileSync(options.input ?? stdin.fd, 'utf-8');
        const isJson = (options.json || options.input?.endsWith('.json')) ?? false;
        const types = generateTypesFromSnapshot(isJson ? JSON.parse(content) : YAML.parse(content));

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
