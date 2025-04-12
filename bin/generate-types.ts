#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'yaml';
import { toSchema } from '../src/schema';
import { toDirectusSnapshot } from '../src/snapshot';
import { inspect } from 'util';
import { generateTypesFromSchema } from '../src/index';

function main() {
  try {
    // Get command line arguments
    const args = process.argv.slice(2);
    if (args.length < 1) {
      console.error('Usage: generate-types <input-schema> [output-file]');
      process.exit(1);
    }

    const [inputPath, outputPath] = args;

    // Read and parse the schema file
    const content = readFileSync(inputPath, 'utf-8');
    const isYaml = inputPath.endsWith('.yaml') || inputPath.endsWith('.yml');
    const schema = isYaml ? parse(content) : JSON.parse(content);

    // Generate TypeScript types
    const types = toSchema(toDirectusSnapshot(schema));

    if (outputPath) {
      if (outputPath.endsWith('.ts')) {
        // Write the output file
        writeFileSync(outputPath, generateTypesFromSchema(types), 'utf-8');
        console.log(`Types generated successfully and written to ${outputPath}`);
      } else {
        // Write the output file
        writeFileSync(outputPath, JSON.stringify(types, null, 2), 'utf-8');
        console.log(`Types generated successfully and written to ${outputPath}`);
      }
    } else {
      // Output to console
      console.log(inspect(types, { depth: 6, colors: true }));
    }
  } catch (error) {
    console.error('Error generating types:', error);
    process.exit(1);
  }
}

main();
