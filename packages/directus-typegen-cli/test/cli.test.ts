import { describe, test, expect } from 'bun:test';
import { spawn } from 'bun';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { http, HttpResponse } from 'msw';
import { createServer } from '@mswjs/http-middleware';

const schemasDir = join(import.meta.dir, '../../../test/schemas');
const dataDir = join(import.meta.dir, '../../../test/data');
const packageJsonPath = join(import.meta.dir, '../package.json');
const version = JSON.parse(readFileSync(packageJsonPath, 'utf-8')).version;
const schemaFiles = readdirSync(schemasDir).filter((file) => file.endsWith('.yaml'));
const dataFiles = readdirSync(dataDir).filter((file) => file.endsWith('.json'));

async function execute(args: string[], stdin?: Uint8Array) {
  const process = spawn(['bun', 'src/index.ts', ...args], {
    stdin,
    stdout: 'pipe',
    stderr: 'pipe',
    cwd: join(import.meta.dir, '..'),
  });

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

  test.each(schemaFiles)('generates types for %s', async (schemaFile) => {
    const schemaPath = join(schemasDir, schemaFile);
    const result = await execute(['snapshot', '-i', schemaPath]);

    expect(result).toMatchSnapshot();
  });

  test.each(schemaFiles)('generate snapshot from stdin for %s', async (schemaFile) => {
    const schemaPath = join(schemasDir, schemaFile);
    const schemaContent = readFileSync(schemaPath, 'utf-8');
    const result = await execute(['snapshot'], new TextEncoder().encode(schemaContent));

    expect(result).toMatchSnapshot();
  });

  test.each(dataFiles)('generates types from server for %s', async (dataFile) => {
    const dataPath = join(dataDir, dataFile);
    const data = JSON.parse(readFileSync(dataPath, 'utf-8'));

    const app = createServer(
      http.post('/auth/login', () => HttpResponse.json({ data: { token: '1234567890' } })),
      http.get('/collections', () => HttpResponse.json(data.collections)),
      http.get('/fields', () => HttpResponse.json(data.fields)),
      http.get('/relations', () => HttpResponse.json(data.relations)),
    );
    const server = app.listen(8055);
    try {
      const result = await execute(['server', '--url', 'http://localhost:8055', '--user', 'admin@example.com:test']);
      expect(result).toMatchSnapshot();
    } finally {
      server.close();
    }
  });
});
