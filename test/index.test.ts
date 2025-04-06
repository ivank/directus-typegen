import { generateTypesFromSnapshot } from "../src";
import { parse } from "yaml";
import * as fs from "fs";
import * as path from "path";

describe("generateTypesFromSnapshot", () => {
  const schemasDir = path.join(__dirname, "schemas");

  // Helper function to read and process schema files
  const processSchemaFile = (filename: string) => {
    const filePath = path.join(schemasDir, filename);
    const content = fs.readFileSync(filePath, "utf-8");
    const isYaml = filename.endsWith(".yaml") || filename.endsWith(".yml");

    return generateTypesFromSnapshot(
      isYaml ? parse(content) : JSON.parse(content)
    );
  };

  // Test each schema file
  fs.readdirSync(schemasDir).forEach((filename) => {
    test(`generates correct types for ${filename}`, () => {
      const types = processSchemaFile(filename);
      expect(types).toMatchSnapshot();
    });
  });
});
