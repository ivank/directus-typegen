import {
  type TypeNode,
  createSourceFile,
  ScriptTarget,
  SyntaxKind,
  factory,
  createPrinter,
  ListFormat,
} from 'typescript';
import type { Schema, TypeSchema, FieldSchema } from './types.js';
import { type DirectusSnapshot, toDirectusSnapshot } from './snapshot.js';
import { toSchema } from './schema.js';

const toType = (field: TypeSchema): TypeNode => {
  switch (field.type) {
    case 'literal':
      return factory.createLiteralTypeNode(factory.createStringLiteral(field.value));
    case 'enum':
      return factory.createUnionTypeNode(
        field.options.map((option) => factory.createLiteralTypeNode(factory.createStringLiteral(option))),
      );
    case 'alias':
      return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
    case 'array':
      return factory.createArrayTypeNode(toType(field.items));
    case 'primitive':
      switch (field.value) {
        case 'string':
          return factory.createKeywordTypeNode(SyntaxKind.StringKeyword);
        case 'number':
          return factory.createKeywordTypeNode(SyntaxKind.NumberKeyword);
        case 'boolean':
          return factory.createKeywordTypeNode(SyntaxKind.BooleanKeyword);
        case 'binary':
          return factory.createTypeReferenceNode('Buffer', undefined);
        default:
          return factory.createKeywordTypeNode(SyntaxKind.UnknownKeyword);
      }
  }
};

const toField = (field: FieldSchema): TypeNode => {
  const type = toType(field.type);

  if (field.relation) {
    switch (field.relation.type) {
      case 'Many':
        return factory.createUnionTypeNode([
          type,
          factory.createArrayTypeNode(
            factory.createTypeReferenceNode(factory.createIdentifier(field.relation.collection), undefined),
          ),
        ]);
      case 'One':
        return factory.createUnionTypeNode([
          type,
          factory.createTypeReferenceNode(factory.createIdentifier(field.relation.collection)),
        ]);
      case 'File':
        return factory.createUnionTypeNode([
          type,
          factory.createTypeReferenceNode(factory.createIdentifier('directus_files')),
        ]);
    }
  }

  return type;
};

/**
 * Generate TypeScript types from a Directus schema
 * @param schema - The Directus schema
 * @returns The generated TypeScript types
 */
export function generateTypesFromSchema(schema: Schema): string {
  // Create a virtual source file
  const sourceFile = createSourceFile('schema.ts', '', ScriptTarget.Latest);

  const collectionInterfaces = Array.from(schema.collections).map(([collectionName, collection]) => {
    const junction = schema.junctions.get(collectionName);

    if (junction) {
      return factory.createTypeAliasDeclaration(
        [factory.createModifier(SyntaxKind.ExportKeyword)],
        factory.createIdentifier(collectionName),
        undefined,
        factory.createUnionTypeNode(
          junction.allowedCollections.map((allowedCollection) =>
            factory.createTypeLiteralNode(
              Array.from(collection.fields).map(([fieldName, field]) =>
                factory.createPropertySignature(
                  undefined,
                  fieldName,
                  undefined,
                  fieldName == junction.collectionField
                    ? factory.createLiteralTypeNode(factory.createStringLiteral(allowedCollection))
                    : fieldName == junction.itemField
                      ? factory.createTypeReferenceNode(factory.createIdentifier(allowedCollection))
                      : toField(field),
                ),
              ),
            ),
          ),
        ),
      );
    } else {
      return factory.createInterfaceDeclaration(
        [factory.createModifier(SyntaxKind.ExportKeyword)],
        factory.createIdentifier(collectionName),
        undefined,
        undefined,
        Array.from(collection.fields).map(([fieldName, field]) =>
          factory.createPropertySignature(
            undefined,
            fieldName,
            field.required ? undefined : factory.createToken(SyntaxKind.QuestionToken),
            toField(field),
          ),
        ),
      );
    }
  });

  const customCollectionInterfaces = Array.from(schema.builtInCollections).map(([collectionName, collection]) => {
    return factory.createInterfaceDeclaration(
      [factory.createModifier(SyntaxKind.ExportKeyword)],
      factory.createIdentifier(collectionName),
      undefined,
      undefined,
      Array.from(collection.fields).map(([fieldName, field]) =>
        factory.createPropertySignature(
          undefined,
          fieldName,
          field.required ? undefined : factory.createToken(SyntaxKind.QuestionToken),
          toField(field),
        ),
      ),
    );
  });

  // Create the Schema interface that combines all collections
  const schemaInterface = factory.createInterfaceDeclaration(
    [factory.createModifier(SyntaxKind.ExportKeyword)],
    factory.createIdentifier('Schema'),
    undefined,
    undefined,
    Array.from(schema.collections).map(([collectionName, collection]) => {
      return factory.createPropertySignature(
        undefined,
        collectionName,
        undefined,
        collection.isSingleton
          ? factory.createTypeReferenceNode(factory.createIdentifier(collectionName))
          : factory.createArrayTypeNode(
              factory.createTypeReferenceNode(factory.createIdentifier(collectionName), undefined),
            ),
      );
    }),
  );

  // Combine all type declarations
  const typeDeclarations = [...collectionInterfaces, ...customCollectionInterfaces, schemaInterface];

  // Generate the TypeScript code
  const printer = createPrinter();
  return printer.printList(ListFormat.MultiLine, factory.createNodeArray(typeDeclarations), sourceFile);
}

/**
 * Generate TypeScript types from a Directus snapshot
 * @param snapshot - The Directus snapshot
 * @returns The generated TypeScript types
 */
export function generateTypesFromSnapshot(snapshot: Record<string, unknown>): string {
  return generateTypesFromSnapshotParsed(toDirectusSnapshot(snapshot));
}

/**
 * Generate TypeScript types from a Directus snapshot
 * @param snapshot - The Directus snapshot
 * @returns The generated TypeScript types
 */
export function generateTypesFromSnapshotParsed(snapshot: DirectusSnapshot): string {
  return generateTypesFromSchema(toSchema(snapshot));
}
