import { describe, test, expect } from 'bun:test';
import { spawn } from 'bun';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const schemasDir = join(import.meta.dir, 'schemas');
const cliPath = join(import.meta.dir, '../dist/cli.js');

describe('CLI', () => {
  const schemaFiles = readdirSync(schemasDir).filter((file) => file.endsWith('.yaml'));

  for (const schemaFile of schemaFiles) {
    test(`generates types for ${schemaFile}`, async () => {
      const schemaPath = join(schemasDir, schemaFile);

      const process = spawn([cliPath, 'generate', '-i', schemaPath], {
        stdout: 'pipe',
        stderr: 'pipe',
      });

      const [stdout, stderr] = await Promise.all([
        new Response(process.stdout).text(),
        new Response(process.stderr).text(),
      ]);
      const exitCode = await process.exited;

      expect(exitCode).toBe(0);
      expect(stderr).toBe('');
      expect(stdout).toMatchSnapshot();
    });

    test(`generates types for ${schemaFile} from stdin`, async () => {
      const schemaPath = join(schemasDir, schemaFile);
      const schemaContent = readFileSync(schemaPath, 'utf-8');

      const process = spawn([cliPath, 'generate'], {
        stdin: new TextEncoder().encode(schemaContent),
        stdout: 'pipe',
        stderr: 'pipe',
      });

      const [stdout, stderr] = await Promise.all([
        new Response(process.stdout).text(),
        new Response(process.stderr).text(),
      ]);
      const exitCode = await process.exited;
      expect(exitCode).toBe(0);
      expect(stderr).toBe('');
      expect(stdout).toMatchSnapshot();
    });
  }
});
