import { z } from 'zod';

// filter out collections that have names that are typescript reserved keywords
const reservedKeywords = new Set([
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'enum',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'function',
  'if',
  'import',
  'in',
  'instanceof',
  'new',
  'null',
  'return',
  'super',
  'switch',
  'this',
  'throw',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'as',
  'implements',
  'interface',
  'let',
  'package',
  'private',
  'protected',
  'public',
  'static',
  'yield',
  'any',
  'boolean',
  'constructor',
  'declare',
  'get',
  'module',
  'require',
  'number',
  'set',
  'string',
  'symbol',
  'type',
  'from',
  'of',
]);

const fieldSnapshot = z.object({
  field: z.string(),
  type: z.string(),
  collection: z.string(),
  schema: z
    .object({
      is_primary_key: z.boolean().optional(),
      is_nullable: z.boolean().optional(),
    })
    .optional(),
  meta: z.object({
    special: z.array(z.string()).nullable(),
    required: z.boolean(),
    options: z
      .object({
        choices: z.array(z.object({ value: z.string() })).optional(),
      })
      .nullable(),
  }),
});

const relationSnapshot = z.object({
  collection: z.string(),
  field: z.string(),
  related_collection: z.string().nullable(),
  meta: z.object({
    junction_field: z.string().nullable(),
    many_collection: z.string().nullable(),
    many_field: z.string().nullable(),
    one_allowed_collections: z.array(z.string()).nullable(),
    one_collection: z.string().nullable(),
    one_collection_field: z.string().nullable(),
    one_field: z.string().nullable(),
  }),
});

const relationJunctionSnapshot = relationSnapshot.extend({
  meta: relationSnapshot.shape.meta.extend({
    junction_field: z.string(),
    many_field: z.string(),
    one_allowed_collections: z.array(z.string()).nonempty(),
    one_collection_field: z.string(),
    many_collection: z.string(),
  }),
});

const relationManySnapshot = relationSnapshot.extend({
  related_collection: z.string(),
  meta: relationSnapshot.shape.meta.extend({
    many_collection: z.string(),
    many_field: z.string(),
    one_collection: z.string(),
    one_field: z.string(),
  }),
});

const relationOneSnapshot = relationSnapshot.extend({
  related_collection: z.string(),
  meta: relationSnapshot.shape.meta.extend({
    many_collection: z.string(),
    many_field: z.string(),
    one_collection: z.string(),
  }),
});

const collectionSnapshot = z.object({
  collection: z.string(),
  meta: z.object({
    singleton: z.boolean().nullable(),
  }),
});

// Main schema
export const directusSnapshot = z.object({
  collections: z.array(collectionSnapshot),
  fields: z.array(fieldSnapshot),
  relations: z.array(relationSnapshot),
});

const isJunctionRelation = (relation: RelationSnapshot): relation is RelationJunctionSnapshot =>
  relationJunctionSnapshot.safeParse(relation).success;

export type DirectusSnapshot = z.infer<typeof directusSnapshot>;

export type FieldSnapshot = z.infer<typeof fieldSnapshot>;

export type CollectionSnapshot = z.infer<typeof collectionSnapshot>;

export type RelationSnapshot = z.infer<typeof relationSnapshot>;

export type RelationJunctionSnapshot = z.infer<typeof relationJunctionSnapshot>;

export type RelationManySnapshot = z.infer<typeof relationManySnapshot>;

export type RelationOneSnapshot = z.infer<typeof relationOneSnapshot>;

export const toDirectusSnapshot = (value: any) => directusSnapshot.parse(value);

export const toFieldSnapshotChoices = (field: FieldSnapshot): string[] | undefined =>
  field.meta?.options?.choices?.map((choice) => choice.value);

export const toCollectionFieldSnapshots = (
  snapshot: DirectusSnapshot,
  { collection }: CollectionSnapshot,
): FieldSnapshot[] => snapshot.fields.filter((field) => field.collection === collection);

export const toBuiltInFieldSnapshots = (snapshot: DirectusSnapshot): FieldSnapshot[] =>
  snapshot.fields.filter((field) => field.collection.startsWith('directus_'));

export const isFieldFile = (field: FieldSnapshot): boolean => field.meta?.special?.includes('file') ?? false;

export const isFieldRequired = (field: FieldSnapshot): boolean =>
  field.meta?.required || field.schema?.is_primary_key || field.schema?.is_nullable === false;

export const isFieldData = (field: FieldSnapshot): boolean =>
  field.meta?.special ? !field.meta.special.includes('no-data') : true;

export const isFieldAlias = (field: FieldSnapshot): boolean => field.type === 'alias';

export const toRelationManySnapshot = (
  snapshot: DirectusSnapshot,
  field: FieldSnapshot,
): RelationManySnapshot | undefined =>
  relationManySnapshot.safeParse(
    snapshot.relations.find(
      (relation) => relation.related_collection === field.collection && relation.meta.one_field === field.field,
    ),
  )?.data;

export const toRelationFieldSnapshot = (
  snapshot: DirectusSnapshot,
  relation: RelationManySnapshot,
): FieldSnapshot | undefined =>
  snapshot.fields.find((f) => f.collection === relation.collection && f.field === relation.field);

export const toRelationOneSnapshot = (
  snapshot: DirectusSnapshot,
  field: FieldSnapshot,
): RelationOneSnapshot | undefined =>
  relationOneSnapshot.safeParse(
    snapshot.relations.find(
      (relation) => relation.collection === field.collection && relation.meta.many_field === field.field,
    ),
  )?.data;

export const toAllRelationJunctionSnapshots = (snapshot: DirectusSnapshot): RelationJunctionSnapshot[] =>
  snapshot.relations.filter(isJunctionRelation);

export const snapshotCollectionRelation = (
  snapshot: DirectusSnapshot,
  { collection, field }: FieldSnapshot,
): RelationSnapshot | undefined =>
  snapshot.relations.find((relation) => relation.collection === collection && relation.field === field);

export const toAllCollectionSnapshots = (snapshot: DirectusSnapshot): CollectionSnapshot[] =>
  snapshot.collections.filter((collection) => !reservedKeywords.has(collection.collection));
