import APIStore from 'modules/API';
import type { SchemaSubject, Compatibility, SchemaType, SchemaSchema } from 'types';

export const checkSchemaCompatibility = async (
  subject: SchemaSubject,
  { schemaType = 'AVRO', schema }: { schemaType?: SchemaType; schema: SchemaSchema },
): Promise<boolean> => {
  const response = await fetch(`${APIStore.getBaseUrl()}/compatibility/subjects/${subject}/versions/latest`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ schemaType, schema }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(`Check compatibility error. Code: ${json.error_code}. ${json.message}`);
  }

  return json.is_compatible;
};

/*
 * Update global compatibility level.
 * */
export const updateGlobalCompatibility = async (
  compatibility: Compatibility,
): Promise<{ compatibility: Compatibility }> => {
  const response = await fetch(`${APIStore.getBaseUrl()}/config`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ compatibility }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(`Update global config error. Code: ${json.error_code}. ${json.message}`);
  }

  return json;
};

/*
 * Get global compatibility level.
 * */
export const getGlobalCompatibility = async (): Promise<{ compatibilityLevel: Compatibility }> => {
  const response = await fetch(`${APIStore.getBaseUrl()}/config`);

  const json = await response.json();
  if (!response.ok) {
    throw new Error(`Get global config error. Code: ${json.error_code}. ${json.message}`);
  }

  return json;
};

/*
 * Get compatibility level for a subject.
 * */
export const getSubjectCompatibility = async (
  subject: SchemaSubject,
): Promise<{ compatibilityLevel: Compatibility } | null> => {
  const response = await fetch(`${APIStore.getBaseUrl()}/config/${subject}`);

  if (response.status === 404) {
    return null;
  }

  const json = await response.json();
  if (!response.ok) {
    throw new Error(`Get subject config error. Code: ${json.error_code}. ${json.message}`);
  }

  return json;
};

/*
 * Update global compatibility level.
 * */
export const updateSubjectCompatibility = async (
  subject: SchemaSubject,
  compatibility: Compatibility,
): Promise<{ compatibility: Compatibility }> => {
  const response = await fetch(`${APIStore.getBaseUrl()}/config/${subject}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/vnd.schemaregistry.v1+json' },
    body: JSON.stringify({ compatibility }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(`Update subject config error. Code: ${json.error_code}. ${json.message}`);
  }

  return json;
};

/*
 * Deletes the specified subject-level compatibility level config and reverts to the global default.
 * */
export const deleteSubjectCompatibility = async (
  subject: SchemaSubject,
): Promise<{ compatibility: Compatibility }> => {
  const response = await fetch(`${APIStore.getBaseUrl()}/config/${subject}`);

  const json = await response.json();
  if (!response.ok) {
    throw new Error(`Delete subject config error. Code: ${json.error_code}. ${json.message}`);
  }

  return json;
};
