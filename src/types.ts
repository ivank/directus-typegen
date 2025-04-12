export type TypeSchema =
  | { type: 'literal'; value: 'csv' | 'json' | 'datetime' }
  | { type: 'enum'; options: string[] }
  | { type: 'alias' }
  | { type: 'primitive'; value: 'string' | 'number' | 'boolean' | 'binary' | 'alias' | 'unknown' }
  | { type: 'array'; items: TypeSchema };

export interface RelationSchema {
  type: 'Many' | 'One' | 'File';
  collection: string;
}

export interface FieldSchema {
  type: TypeSchema;
  required?: boolean;
  relation?: RelationSchema;
}

export type CollectionSchema = {
  isSingleton?: boolean;
  fields: Map<string, FieldSchema>;
};

export type JunctionSchema = {
  itemField: string;
  collectionField: string;
  allowedCollections: string[];
};

export type Schema = {
  collections: Map<string, CollectionSchema>;
  builtInCollections: Map<string, CollectionSchema>;
  junctions: Map<string, JunctionSchema>;
};
