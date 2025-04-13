import { toSchema } from '../src';
import { parse } from 'yaml';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const dir = import.meta.dir;

describe('toSchema', () => {
  const schemasDir = join(dir, 'schemas');

  for (const filename of readdirSync(schemasDir)) {
    test(`generates correct types for ${filename}`, () => {
      const content = readFileSync(join(schemasDir, filename), 'utf-8');
      const snapshot = filename.endsWith('.yaml') ? parse(content) : JSON.parse(content);

      const types = toSchema(snapshot);
      expect(types).toMatchSnapshot();
    });
  }
});
