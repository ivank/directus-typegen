import { toSchema } from '../src/schema';
import { parse } from 'yaml';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

describe('toSchema', () => {
  const schemasDir = join(__dirname, 'schemas');

  test.each(readdirSync(schemasDir))('generates correct types for %s', (filename) => {
    const content = readFileSync(join(schemasDir, filename), 'utf-8');
    const snapshot = filename.endsWith('.yaml') ? parse(content) : JSON.parse(content);

    const types = toSchema(snapshot);
    expect(types).toMatchSnapshot();
  });
});
