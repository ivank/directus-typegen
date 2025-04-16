import { generateTypesFromSnapshot } from '@ikerin/directus-typegen';
import { readFileSync } from 'fs';
import { join } from 'path';

// Get the contents of the snapshot
// We are using JSON for simplicity, usually you will use YAML
const snapshotPath = join(import.meta.dirname, 'snapshot.json');
const snapshot = JSON.parse(readFileSync(snapshotPath, 'utf-8'));

// This is the core of the operation
const types = generateTypesFromSnapshot(snapshot);

console.log(types);
