import APIStore from 'modules/API';
import type { Mode, SchemaSubject } from 'types';

/*
 * Get the current mode for Schema Registry at a global level.
 * */
export const getGlobalMode = async (): Promise<{ mode: Mode }> => {
  const response = await fetch(`${APIStore.getBaseUrl()}/mode`);

  const json = await response.json();

  if (!response.ok) {
    throw new Error(`Get global mode error. Code: ${json.error_code}. ${json.message}`);
  }

  return json;
};

/*
 * Update the global Schema Registry mode.
 * */
export const updateGlobalMode = async (mode: Mode): Promise<{ mode: Mode }> => {
  const response = await fetch(`${APIStore.getBaseUrl()}/mode`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(`Update global mode error. Code: ${json.error_code}. ${json.message}`);
  }

  return json;
};

/*
 * Get mode for a subject.
 * */
export const getSubjectMode = async (subject: SchemaSubject): Promise<{ mode: Mode } | null> => {
  const response = await fetch(`${APIStore.getBaseUrl()}/mode/${subject}`);

  if (response.status === 404) {
    return null;
  }

  const json = await response.json();
  if (!response.ok) {
    throw new Error(`Get subject mode error. Code: ${json.error_code}. ${json.message}`);
  }

  return json;
};

/*
 * Update the mode for the specified subject.
 * */
export const updateSubjectMode = async (subject: SchemaSubject, mode: Mode): Promise<{ mode: Mode }> => {
  const response = await fetch(`${APIStore.getBaseUrl()}/mode/${subject}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/vnd.schemaregistry.v1+json' },
    body: JSON.stringify({ mode }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(`Update subject mode error. Code: ${json.error_code}. ${json.message}`);
  }

  return json;
};

/*
 * Deletes the subject-level mode for the specified subject and reverts to the global default.
 * */
export const deleteSubjectMode = async (subject: SchemaSubject): Promise<{ mode: Mode }> => {
  const response = await fetch(`${APIStore.getBaseUrl()}/mode/${subject}`);

  const json = await response.json();
  if (!response.ok) {
    throw new Error(`Delete subject mode error. Code: ${json.error_code}. ${json.message}`);
  }

  return json;
};
