import { Command } from 'commander';
import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { generateTypesFromSnapshot } from '@ikerin/directus-typegen';
import { stdin, stdout } from 'process';
import { createInterface } from 'readline';
import { parse } from 'path';

async function readStdin(): Promise<string> {
  const rl = createInterface({ input: stdin });
  let content = '';
  for await (const line of rl) {
    content += line + '\n';
  }
  return content;
}

const program = new Command();

program
  .name('directus-typegen')
  .description('Generate TypeScript types from Directus schema snapshots')
  .version('1.0.0');

program
  .command('generate')
  .description('Generate TypeScript types from a schema snapshot')
  .option('-i, --input <file>', 'Input schema file. If not provided, reads from stdin')
  .option('-o, --output <file>', 'Output TypeScript file. If not provided, writes to stdout')
  .option('-j, --json', 'Treat input as JSON (default: YAML)')
  .action(async (options) => {
    try {
      if (options.input) {
        const content = readFileSync(options.input, 'utf-8');
        const isJson = options.json || options.input.endsWith('.json');

        const types = generateTypesFromSnapshot(isJson ? JSON.parse(content) : parse(content));

        if (options.output) {
          writeFileSync(options.output, types, 'utf-8');
          console.error(`Types generated successfully to ${options.output}`);
        } else {
          stdout.write(types);
        }
      } else {
        const content = await readStdin();
        const tempFile = 'temp-schema.yaml';
        writeFileSync(tempFile, content, 'utf-8');

        try {
          const isJson = options.json;
          const types = generateTypesFromSnapshot(isJson ? JSON.parse(content) : parse(content));
          stdout.write(types);
        } finally {
          // Clean up temp file
          try {
            unlinkSync(tempFile);
          } catch (e) {
            // Ignore cleanup errors
          }
        }
      }
    } catch (error) {
      console.error('Error generating types:', error);
      process.exit(1);
    }
  });

program.parse();
