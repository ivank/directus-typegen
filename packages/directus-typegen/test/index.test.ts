import { generateTypesFromSnapshot } from '../src';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { parse } from 'yaml';

const dir = import.meta.dir;

describe('generateTypesFromSnapshot', () => {
  const schemasDir = join(dir, 'schemas');

  for (const filename of readdirSync(schemasDir)) {
    test(`generates correct types for ${filename}`, () => {
      const content = readFileSync(join(schemasDir, filename), 'utf-8');
      const snapshot = filename.endsWith('.yaml') ? parse(content) : JSON.parse(content);

      const types = generateTypesFromSnapshot(snapshot);
      expect(types).toMatchSnapshot();
    });
  }
});
