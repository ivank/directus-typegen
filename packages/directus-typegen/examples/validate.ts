import { toDirectusSnapshot } from '@ikerin/directus-typegen';
import { readFileSync } from 'fs';
import { join } from 'path';

const snapshot = JSON.parse(readFileSync(join(import.meta.dirname, 'snapshot.json'), 'utf-8'));

// << generate
// Validate the types to the ones that are expected by typegen
const validSnapshot = toDirectusSnapshot(snapshot);

console.log(validSnapshot);
// generate
