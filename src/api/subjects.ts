import APIStore from 'modules/API';
import type { Schema, SchemaId, SchemaSchema, SchemaSubject, SchemaType, SchemaVersion } from 'types';

/*
 * Get a list of registered subjects.
 * */
export const getSubjects = async () => {
  const response = await fetch(`${APIStore.getBaseUrl()}/subjects`);

  if (!response.ok) {
    const json: { message: string; error_code: number } = await response.json();
    throw new Error(`Get subjects error. Code: ${json.error_code}. ${json.message}`);
  }

  const subjects: SchemaSubject[] = await response.json();
  return subjects;
};

/**
 * Get a list of versions registered under the specified subject.
 * */
export const getSubjectVersions = async (subject: SchemaSubject): Promise<SchemaVersion[]> => {
  const response = await fetch(`${APIStore.getBaseUrl()}/subjects/${subject}/versions`);

  if (response.status === 404) {
    return [];
  }

  const json = await response.json();

  if (!response.ok)
    throw new Error(
      `Get subject ${APIStore.getBaseUrl()} versions error. Code ${json.error_code}. ${json.message}`,
    );

  return json;
};

/**
 * Deletes the specified subject and its associated compatibility level if registered.
 * */
export const deleteSubject = async (subject: SchemaSubject, version?: SchemaVersion, permanent?: boolean) => {
  const suffix = version ? `versions/${version}` : '';
  const response = await fetch(`${APIStore.getBaseUrl()}/subjects/${subject}/${suffix}`, {
    method: 'DELETE',
  });
  const json = await response.json();
  if (!response.ok)
    throw new Error(
      `Delete subject ${subject} ${version ? `(Version ${version})` : ''} error. Code: ${json.error_code}. ${
        json.message
      }`,
    );
};

/**
 * Get a specific version of the schema registered under this subject
 * */
export const getSpecificSubjectVersion = async (
  subject: SchemaSubject,
  version: SchemaVersion = -1,
): Promise<Schema> => {
  const response = await fetch(`${APIStore.getBaseUrl()}/subjects/${subject}/versions/${version}`);
  const json = await response.json();
  if (!response.ok)
    throw new Error(
      `Get subject ${subject} (versions ${version}) error. Code: ${json.error_code}. ${json.message}`,
    );
  return json;
};

/**
 * Register a new schema under the specified subject.
 * */
export const registerSubject = async (
  subject: string,
  { schemaType = 'AVRO', schema }: { schemaType?: SchemaType; schema: SchemaSchema },
): Promise<SchemaId> => {
  const response = await fetch(`${APIStore.getBaseUrl()}/subjects/${subject}/versions`, {
    method: 'POST',
    body: JSON.stringify({ schemaType, schema }),
    headers: { 'Content-Type': 'application/json' },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(`Register schema error. ${json.error_code} ${json.message}`);
  }

  return json.id;
};

/**
 * Register a new schema under the specified subject.
 * */
export const checkSubjectRegistered = async (
  subject: string,
  { schemaType = 'AVRO', schema }: { schemaType?: SchemaType; schema: SchemaSchema },
): Promise<Schema | null> => {
  const response = await fetch(`${APIStore.getBaseUrl()}/subjects/${subject}`, {
    method: 'POST',
    body: JSON.stringify({ schemaType, schema }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status === 404) {
    return null;
  }

  const json = await response.json();

  if (!response.ok) {
    throw new Error(`Check subject registered error. ${json.error_code} ${json.message}`);
  }

  return json;
};

export const getSchema = (subject: SchemaSubject) => {
  return getSubjectVersions(subject).then((_versions) => {
    return Promise.all(_versions.map((v) => getSpecificSubjectVersion(subject, v)));
  });
};
