import { describe, test, expect } from 'bun:test';
import { spawn, stderr, stdout } from 'bun';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const schemasDir = join(import.meta.dir, 'schemas');
const cliPath = join(import.meta.dir, '../bin/directus-typegen');
const packageJsonPath = join(import.meta.dir, '../package.json');
const version = JSON.parse(readFileSync(packageJsonPath, 'utf-8')).version;

async function execute(args: string[], stdin?: Uint8Array) {
  const process = spawn([cliPath, ...args], { stdin, stdout: 'pipe', stderr: 'pipe' });

  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(process.stdout).text(),
    new Response(process.stderr).text(),
    process.exited,
  ]);

  return { stdout, stderr, exitCode };
}

describe('CLI', () => {
  test(`should have the right version`, async () => {
    const result = await execute(['--version']);

    expect(result).toMatchSnapshot({ stdout: `${version}\n` });
  });

  const schemaFiles = readdirSync(schemasDir).filter((file) => file.endsWith('.yaml'));

  for (const schemaFile of schemaFiles) {
    test(`generates types for ${schemaFile}`, async () => {
      const schemaPath = join(schemasDir, schemaFile);
      const result = await execute(['generate', '-i', schemaPath]);

      expect(result).toMatchSnapshot();
    });

    test(`generates types for ${schemaFile} from stdin`, async () => {
      const schemaPath = join(schemasDir, schemaFile);
      const schemaContent = readFileSync(schemaPath, 'utf-8');
      const result = await execute(['generate'], new TextEncoder().encode(schemaContent));

      expect(result).toMatchSnapshot();
    });
  }
});
