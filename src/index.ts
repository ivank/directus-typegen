import {
  createSourceFile,
  ScriptTarget,
  SyntaxKind,
  TypeNode,
  factory,
} from "typescript";
import { Snapshot, SnapshotField } from "./types";

export function generateTypesFromSnapshot(schema: Snapshot): string {
  // Create a virtual source file
  const sourceFile = createSourceFile("schema.ts", "", ScriptTarget.Latest);

  // Create type nodes for each collection
  const collectionTypes = schema.collections
    .filter((collection) =>
      schema.fields.some(
        (field) =>
          field.collection === collection.collection &&
          !field.field?.startsWith("divider")
      )
    )
    .map((collection) => {
      const fields = schema.fields.filter(
        (field) =>
          field.collection === collection.collection &&
          !field.field?.startsWith("divider")
      );

      return factory.createTypeAliasDeclaration(
        [factory.createModifier(SyntaxKind.ExportKeyword)],
        factory.createIdentifier(collection.collection),
        undefined,
        factory.createTypeLiteralNode(
          fields.map((field) => {
            const type = mapDirectusTypeToTypeScript(field, schema);
            return factory.createPropertySignature(
              undefined,
              field.field,
              field.schema?.is_nullable
                ? factory.createToken(SyntaxKind.QuestionToken)
                : undefined,
              type
            );
          })
        )
      );
    });

  // Create the Schema interface that combines all collections
  const schemaInterface = factory.createInterfaceDeclaration(
    [factory.createModifier(SyntaxKind.ExportKeyword)],
    factory.createIdentifier("Schema"),
    undefined,
    undefined,
    schema.collections
      .filter((collection) =>
        schema.fields.some(
          (field) =>
            field.collection === collection.collection &&
            !field.field?.startsWith("divider")
        )
      )
      .map((collection) => {
        return factory.createPropertySignature(
          undefined,
          collection.collection,
          undefined,
          factory.createArrayTypeNode(
            factory.createTypeReferenceNode(
              factory.createIdentifier(collection.collection),
              undefined
            )
          )
        );
      })
  );

  // Combine all type declarations
  const typeDeclarations = [...collectionTypes, schemaInterface];

  // Generate the TypeScript code
  const printer = require("typescript").createPrinter();
  return printer.printList(
    require("typescript").ListFormat.MultiLine,
    factory.createNodeArray(typeDeclarations),
    sourceFile
  );
}

function mapDirectusTypeToTypeScript(
  field: SnapshotField,
  schema: Snapshot
): TypeNode {
  // Handle special cases first
  if (field.meta?.special?.includes("m2o")) {
    const relation = schema.relations.find(
      (r) => r.collection === field.collection && r.field === field.field
    );
    if (relation?.related_collection) {
      return factory.createTypeReferenceNode(
        factory.createIdentifier(relation.related_collection),
        undefined
      );
    }
  }

  if (field.meta?.special?.includes("json")) {
    return factory.createTypeReferenceNode("Record", [
      factory.createKeywordTypeNode(SyntaxKind.StringKeyword),
      factory.createKeywordTypeNode(SyntaxKind.AnyKeyword),
    ]);
  }

  // Map Directus types to TypeScript types
  switch (field.type) {
    case "string":
    case "text":
    case "hash":
    case "uuid":
    case "csv":
      return factory.createKeywordTypeNode(SyntaxKind.StringKeyword);
    case "integer":
    case "decimal":
    case "float":
    case "bigInteger":
      return factory.createKeywordTypeNode(SyntaxKind.NumberKeyword);
    case "dateTime":
    case "date":
    case "time":
    case "timestamp":
      return factory.createTypeReferenceNode("Date", undefined);
    case "json":
      return factory.createTypeReferenceNode("Record", [
        factory.createKeywordTypeNode(SyntaxKind.StringKeyword),
        factory.createKeywordTypeNode(SyntaxKind.AnyKeyword),
      ]);
    case "binary":
      return factory.createTypeReferenceNode("Buffer", undefined);
    case "boolean":
      return factory.createKeywordTypeNode(SyntaxKind.BooleanKeyword);
    case "alias":
      return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
    default:
      return factory.createKeywordTypeNode(SyntaxKind.UnknownKeyword);
  }
}
