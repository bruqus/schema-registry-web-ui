export type SchemaSubject = string;
export type SchemaVersion = number;
export type SchemaId = number;
export type SchemaSchema = string;
export type SchemaType = 'AVRO';

export type Schema = {
  subject: SchemaSubject;
  version: SchemaVersion;
  id: SchemaId;
  schema: SchemaSchema;
};
