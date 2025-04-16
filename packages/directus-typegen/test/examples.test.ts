import { describe, test, expect } from 'bun:test';
import { spawn } from 'bun';
import { readdirSync } from 'fs';
import { join } from 'path';

const examplesDir = join(import.meta.dir, '../examples');

async function execute(args: string[], stdin?: Uint8Array) {
  const process = spawn(args, { stdin, stdout: 'pipe', stderr: 'pipe' });

  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(process.stdout).text(),
    new Response(process.stderr).text(),
    process.exited,
  ]);

  return { stdout, stderr, exitCode };
}

describe('Example', () => {
  const exampleFiles = readdirSync(examplesDir).filter((file) => file.endsWith('.ts'));

  for (const exampleFile of exampleFiles) {
    test(`Should successfully run ${exampleFile}`, async () => {
      const examplePath = join(examplesDir, exampleFile);
      const result = await execute(['bun', examplePath]);

      expect(result).toMatchSnapshot();
    });
  }
});
