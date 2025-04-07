import type { Field, FieldMeta, Relation, RelationMeta } from "@directus/types";
import type { BaseCollectionMeta } from "@directus/system-data";

export type Collection = {
  collection: string;
  fields?: Field[];
  meta: BaseCollectionMeta | null;
};

export const DatabaseClients = [
  "mysql",
  "postgres",
  "cockroachdb",
  "sqlite",
  "oracle",
  "mssql",
  "redshift",
] as const;

export type DatabaseClient = (typeof DatabaseClients)[number];

export type Snapshot = {
  version: number;
  directus: string;
  vendor?: DatabaseClient;
  collections: Collection[];
  fields: SnapshotField[];
  relations: SnapshotRelation[];
};

export type SnapshotField = Field & { meta: Omit<FieldMeta, "id"> };
export interface SnapshotRelation {
  collection: string;
  field: string;
  related_collection: string | null;
  one_field?: string;
  one_collection?: string;
  meta?: {
    one_field?: string;
    one_collection?: string;
  };
}

export type SnapshotWithHash = Snapshot & { hash: string };
