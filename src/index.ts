import {
  createSourceFile,
  ScriptTarget,
  SyntaxKind,
  TypeNode,
  factory,
} from "typescript";
import { Snapshot, SnapshotField, SnapshotRelation } from "./types";

function toPrimitiveFieldType(field: SnapshotField): TypeNode {
  switch (field.type) {
    case "csv":
      return factory.createLiteralTypeNode(factory.createStringLiteral("csv"));
    case "string":
      return field.meta?.options?.choices &&
        Array.isArray(field.meta.options.choices) &&
        field.meta.options.choices.every(
          (c) => typeof c === "object" && c.value && typeof c.value === "string"
        )
        ? factory.createUnionTypeNode(
            field.meta.options.choices.map((choice) =>
              factory.createLiteralTypeNode(
                factory.createStringLiteral(choice.value)
              )
            )
          )
        : factory.createKeywordTypeNode(SyntaxKind.StringKeyword);
    case "text":
    case "hash":
    case "uuid":
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
      return factory.createLiteralTypeNode(
        factory.createStringLiteral("datetime")
      );
    case "json":
      return factory.createLiteralTypeNode(factory.createStringLiteral("json"));
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

function toCollectionFieldType(
  {
    schema,
    oneToMany,
  }: {
    schema: Snapshot;
    oneToMany?: { relation: SnapshotRelation; collection: string };
  },
  field: SnapshotField
): TypeNode {
  if (oneToMany) {
    if (
      oneToMany.relation.collection === field.collection &&
      oneToMany.relation.field === field.field
    ) {
      return factory.createTypeReferenceNode(
        factory.createIdentifier(oneToMany.collection),
        undefined
      );
    }

    if (
      oneToMany.relation.collection === field.collection &&
      oneToMany.relation.meta?.one_collection_field === field.field
    ) {
      return factory.createLiteralTypeNode(
        factory.createStringLiteral(oneToMany.collection)
      );
    }

    if (
      oneToMany.relation.collection === field.collection &&
      oneToMany.relation.meta?.junction_field === field.field
    ) {
      const relation = schema.relations.find(
        (r) => r.collection === field.collection && r.field === field.field
      );

      if (relation?.related_collection) {
        return factory.createUnionTypeNode([
          toPrimitiveFieldType(field),
          factory.createTypeReferenceNode(
            factory.createIdentifier(relation.related_collection),
            undefined
          ),
        ]);
      }
    }
  }

  if (field.meta?.special?.includes("file")) {
    return factory.createUnionTypeNode([
      toPrimitiveFieldType(field),
      factory.createTypeReferenceNode(
        factory.createIdentifier("directus_files"),
        undefined
      ),
    ]);
  }

  // Handle special cases first
  if (field.meta?.special?.includes("m2o")) {
    const relation = schema.relations.find(
      (r) => r.collection === field.collection && r.field === field.field
    );

    if (relation?.related_collection) {
      return factory.createUnionTypeNode([
        toPrimitiveFieldType(field),
        factory.createTypeReferenceNode(
          factory.createIdentifier(relation.related_collection),
          undefined
        ),
      ]);
    }
  }

  if (field.meta?.special?.includes("m2m")) {
    const relation = schema.relations.find(
      (r) =>
        r.related_collection === field.collection &&
        r.meta?.one_field === field.field
    );

    const junctionField = schema.fields.find(
      (f) =>
        f.collection === relation?.collection &&
        f.field === relation?.meta?.many_field
    );

    if (relation?.related_collection && junctionField) {
      return factory.createUnionTypeNode([
        factory.createArrayTypeNode(toPrimitiveFieldType(junctionField)),
        factory.createArrayTypeNode(
          factory.createTypeReferenceNode(
            factory.createIdentifier(relation.related_collection),
            undefined
          )
        ),
      ]);
    }
  }

  if (field.meta?.special?.includes("m2m")) {
    const relation = schema.relations.find(
      (r) =>
        r.related_collection === field.collection &&
        r.meta?.one_field === field.field
    );
    const relatedField = schema.fields.find(
      (f) =>
        f.collection === relation?.related_collection &&
        f.field === relation?.meta?.many_field
    );

    if (relation?.related_collection && relatedField) {
      return factory.createUnionTypeNode([
        factory.createArrayTypeNode(toPrimitiveFieldType(relatedField)),
        factory.createArrayTypeNode(
          factory.createTypeReferenceNode(
            factory.createIdentifier(relation.related_collection),
            undefined
          )
        ),
      ]);
    }
  }

  return toPrimitiveFieldType(field);
}

// filter out collections that have names that are typescript reserved keywords
const reservedKeywords = new Set([
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "import",
  "in",
  "instanceof",
  "new",
  "null",
  "return",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "as",
  "implements",
  "interface",
  "let",
  "package",
  "private",
  "protected",
  "public",
  "static",
  "yield",
  "any",
  "boolean",
  "constructor",
  "declare",
  "get",
  "module",
  "require",
  "number",
  "set",
  "string",
  "symbol",
  "type",
  "from",
  "of",
]);

export function generateTypesFromSnapshot(schema: Snapshot): string {
  // Create a virtual source file
  const sourceFile = createSourceFile("schema.ts", "", ScriptTarget.Latest);

  const collectionInterfaces = schema.collections
    .filter((collection) => !reservedKeywords.has(collection.collection))
    .map((collection) => {
      // Special case for many to any relation collections
      // Must be a discriminated union of types
      // https://docs.directus.io/guides/sdk/types.html#many-to-any
      const manyToAnyRelation = schema.relations.find(
        (r) =>
          r.meta?.many_collection === collection.collection &&
          r.meta?.one_allowed_collections?.length
      );

      if (
        manyToAnyRelation &&
        manyToAnyRelation.meta?.one_allowed_collections
      ) {
        const fields = schema.fields.filter(
          (field) =>
            field.collection === collection.collection &&
            !field.meta?.special?.includes("no-data")
        );

        return factory.createTypeAliasDeclaration(
          [factory.createModifier(SyntaxKind.ExportKeyword)],
          factory.createIdentifier(collection.collection),
          undefined,
          factory.createUnionTypeNode(
            manyToAnyRelation.meta?.one_allowed_collections.map((c) =>
              factory.createTypeLiteralNode(
                fields.map((field) =>
                  factory.createPropertySignature(
                    undefined,
                    field.field,
                    undefined,
                    toCollectionFieldType(
                      {
                        schema,
                        oneToMany: {
                          relation: manyToAnyRelation,
                          collection: c,
                        },
                      },
                      field
                    )
                  )
                )
              )
            )
          )
        );
      }

      const fields = schema.fields.filter(
        (field) =>
          field.collection === collection.collection &&
          !field.meta?.special?.includes("no-data")
      );

      return factory.createInterfaceDeclaration(
        [factory.createModifier(SyntaxKind.ExportKeyword)],
        factory.createIdentifier(collection.collection),
        undefined,
        undefined,
        fields.map((field) =>
          factory.createPropertySignature(
            undefined,
            field.field,
            field.schema?.is_nullable
              ? factory.createToken(SyntaxKind.QuestionToken)
              : undefined,
            toCollectionFieldType({ schema }, field)
          )
        )
      );
    });

  // unique custom collections
  const customCollections = [
    ...new Set(
      schema.fields
        .filter((field) => field.collection.startsWith("directus_"))
        .map((field) => field.collection)
    ),
  ];

  const customCollectionInterfaces = customCollections.map((collection) => {
    const fields = schema.fields.filter(
      (field) =>
        field.collection === collection &&
        !field.meta?.special?.includes("no-data")
    );

    return factory.createInterfaceDeclaration(
      [factory.createModifier(SyntaxKind.ExportKeyword)],
      factory.createIdentifier(collection),
      undefined,
      undefined,
      fields.map((field) =>
        factory.createPropertySignature(
          undefined,
          field.field,
          field.schema?.is_nullable
            ? factory.createToken(SyntaxKind.QuestionToken)
            : undefined,
          toCollectionFieldType({ schema }, field)
        )
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
      .filter((collection) => !reservedKeywords.has(collection.collection))
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
  const typeDeclarations = [
    ...collectionInterfaces,
    ...customCollectionInterfaces,
    schemaInterface,
  ];

  // Generate the TypeScript code
  const printer = require("typescript").createPrinter();
  return printer.printList(
    require("typescript").ListFormat.MultiLine,
    factory.createNodeArray(typeDeclarations),
    sourceFile
  );
}
