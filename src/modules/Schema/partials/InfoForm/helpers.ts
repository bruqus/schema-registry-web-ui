import { SchemaSchema } from 'types';

export const parseSchema = (schema?: SchemaSchema): Record<string, unknown> | null => {
  if (!schema) return null;
  try {
    return JSON.parse(schema);
  } catch {
    return null;
  }
};
