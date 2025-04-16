import { toSchema } from '@ikerin/directus-typegen';
import { readFileSync } from 'fs';
import { join } from 'path';

const snapshot = JSON.parse(readFileSync(join(import.meta.dirname, 'snapshot.json'), 'utf-8'));

// << generate
// Generate an intermediate schema that is later used for typescript generation
const intermediateSchema = toSchema(snapshot);

console.log(intermediateSchema);
// generate
