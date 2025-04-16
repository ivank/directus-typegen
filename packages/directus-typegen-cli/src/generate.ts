import { Command } from 'commander';
import { readFileSync, writeFileSync } from 'fs';
import { generateTypesFromSnapshot } from '@ikerin/directus-typegen';
import { stdin, stdout } from 'process';
import YAML from 'yaml';

const generateCommand = new Command();

generateCommand
  .name('generate')
  .description('Generate TypeScript types from Directus schema snapshots')
  .version('0.1.5');

generateCommand
  .command('generate')
  .description('Generate TypeScript types from a schema snapshot')
  .option('-i, --input <file>', 'Input schema file. If not provided, reads from stdin')
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

export default generateCommand;
