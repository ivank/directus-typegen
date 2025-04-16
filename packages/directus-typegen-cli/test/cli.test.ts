import { describe, test, expect } from 'bun:test';
import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import generateCommand from '../src/generate.js';

const schemasDir = join(import.meta.dir, 'schemas');

describe('CLI', () => {
  const schemaFiles = readdirSync(schemasDir).filter((file) => file.endsWith('.yaml'));

  for (const schemaFile of schemaFiles) {
    test(`generates types for ${schemaFile}`, async () => {
      const schemaPath = join(schemasDir, schemaFile);
      let output = '';

      // Mock stdout.write to capture output
      const mockWrite = (data: string) => {
        output += data;
        return true;
      };
      const originalWrite = process.stdout.write;
      process.stdout.write = mockWrite as any;

      try {
        await generateCommand.parseAsync(['node', 'test', 'generate', '-i', schemaPath]);
      } finally {
        process.stdout.write = originalWrite;
      }

      expect(output).toMatchSnapshot();
    });

    test(`generates types for ${schemaFile} from stdin`, async () => {
      const schemaPath = join(schemasDir, schemaFile);
      const schemaContent = readFileSync(schemaPath, 'utf-8');
      let output = '';

      // Mock stdout.write to capture output
      const mockWrite = (data: string) => {
        output += data;
        return true;
      };
      const originalWrite = process.stdout.write;
      process.stdout.write = mockWrite as any;

      // Write content to temp file that will be read as stdin
      const tempFile = 'temp-schema.yaml';
      writeFileSync(tempFile, schemaContent, 'utf-8');

      try {
        await generateCommand.parseAsync(['node', 'test', 'generate']);
      } finally {
        process.stdout.write = originalWrite;
      }

      expect(output).toMatchSnapshot();
    });
  }
});
