#!/usr/bin/env node

import { readFileSync, writeFileSync } from "fs";
import { parse } from "yaml";
import { generateTypesFromSnapshot } from "../src";
import { Snapshot } from "../src/types";

function main() {
  try {
    // Get command line arguments
    const args = process.argv.slice(2);
    if (args.length < 1) {
      console.error("Usage: generate-types <input-schema> [output-file]");
      process.exit(1);
    }

    const [inputPath, outputPath] = args;

    // Read and parse the schema file
    const content = readFileSync(inputPath, "utf-8");
    const isYaml = inputPath.endsWith(".yaml") || inputPath.endsWith(".yml");
    const schema: Snapshot = isYaml ? parse(content) : JSON.parse(content);

    // Generate TypeScript types
    const types = generateTypesFromSnapshot(schema);

    if (outputPath) {
      // Write the output file
      writeFileSync(outputPath, types, "utf-8");
      console.log(`Types generated successfully and written to ${outputPath}`);
    } else {
      // Output to console
      console.log(types);
    }
  } catch (error) {
    console.error("Error generating types:", error);
    process.exit(1);
  }
}

main();
