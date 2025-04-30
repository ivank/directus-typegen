import {
  toAllCollectionSnapshots,
  type DirectusSnapshot,
  type FieldSnapshot,
  toCollectionFieldSnapshots,
  toBuiltInFieldSnapshots,
  toAllRelationJunctionSnapshots,
  toFieldSnapshotChoices,
  toRelationManySnapshot,
  toRelationOneSnapshot,
  isFieldFile,
  isFieldData,
  isFieldRequired,
  toRelationFieldSnapshot,
  isFieldAlias,
} from './snapshot.js';
import type { Schema, TypeSchema, RelationSchema, CollectionSchema, FieldSchema, JunctionSchema } from './types.js';

const toTypeSchema = (field: FieldSnapshot): TypeSchema => {
  switch (field.type) {
    case 'csv':
    case 'json':
    case 'datetime':
      return { type: 'literal', value: field.type };
    case 'string':
      const choices = toFieldSnapshotChoices(field);
      return choices ? { type: 'enum', options: choices } : { type: 'primitive', value: 'string' };
    case 'text':
    case 'hash':
    case 'uuid':
      return { type: 'primitive', value: 'string' };
    case 'integer':
    case 'decimal':
    case 'float':
    case 'bigInteger':
      return { type: 'primitive', value: 'number' };
    case 'dateTime':
    case 'date':
    case 'time':
    case 'timestamp':
      return { type: 'literal', value: 'datetime' };
    case 'binary':
    case 'boolean':
      return { type: 'primitive', value: field.type };
    case 'alias':
      return { type: 'alias' };
    default:
      return { type: 'primitive', value: 'unknown' };
  }
};

const toRelationSchema = (snapshot: DirectusSnapshot, field: FieldSnapshot): RelationSchema | undefined => {
  let relation;
  if ((relation = toRelationManySnapshot(snapshot, field))) {
    return { type: 'Many', collection: relation.collection };
  } else if ((relation = toRelationOneSnapshot(snapshot, field))) {
    return { type: 'One', collection: relation.related_collection };
  } else if (isFieldFile(field)) {
    return { type: 'File', collection: 'directus_files' };
  } else {
    return undefined;
  }
};

const toRelationFieldType = (snapshot: DirectusSnapshot, field: FieldSnapshot): FieldSnapshot | undefined => {
  const relationMany = toRelationManySnapshot(snapshot, field);
  return relationMany ? toRelationFieldSnapshot(snapshot, relationMany) : field;
};

const toFieldSchema = (snapshot: DirectusSnapshot, field: FieldSnapshot): FieldSchema => {
  const relation = toRelationSchema(snapshot, field);
  const relationField = toRelationFieldType(snapshot, field);

  const type = toTypeSchema(isFieldAlias(field) && relationField ? relationField : field);
  return {
    type: relation?.type === 'Many' ? { type: 'array', items: type } : type,
    required: isFieldRequired(field),
    relation,
  };
};

export const toSchema = (snapshot: DirectusSnapshot): Schema => {
  const collections = toAllCollectionSnapshots(snapshot).reduce((acc, collection) => {
    const fields = toCollectionFieldSnapshots(snapshot, collection).filter(isFieldData);

    return acc.set(collection.collection, {
      isSingleton: collection.meta?.singleton ?? false,
      fields: fields.reduce(
        (acc, field) => acc.set(field.field, toFieldSchema(snapshot, field)),
        new Map<string, FieldSchema>(),
      ),
    });
  }, new Map<string, CollectionSchema>());

  const referencedBuiltInCollections = Array.from(collections)
    .flatMap(([_, collection]) =>
      Array.from(collection.fields)
        .filter(([_, field]) => field.relation?.collection.startsWith('directus_'))
        .map(([_, field]) => field.relation?.collection),
    )
    .reduce(
      (acc, name) => (acc.has(name!) ? acc : acc.set(name!, { fields: new Map<string, FieldSchema>() })),
      new Map<string, CollectionSchema>(),
    );

  const builtInCollections = toBuiltInFieldSnapshots(snapshot).reduce((acc, field) => {
    const existing = acc.get(field.collection);

    if (existing) {
      existing.fields.set(field.field, toFieldSchema(snapshot, field));
    } else {
      acc.set(field.collection, {
        fields: new Map([[field.field, toFieldSchema(snapshot, field)]]),
      });
    }
    return acc;
  }, referencedBuiltInCollections);

  const junctions = toAllRelationJunctionSnapshots(snapshot).reduce(
    (acc, relation) =>
      acc.set(relation.collection, {
        itemField: relation.meta?.many_field ?? '',
        collectionField: relation.meta?.one_collection_field ?? '',
        allowedCollections: relation.meta?.one_allowed_collections ?? [],
      }),
    new Map<string, JunctionSchema>(),
  );

  return { collections, builtInCollections, junctions };
};
