import saveAs from 'file-saver';
import JSZip from 'jszip';

import { getSchema, getSubjects } from 'api/subjects';
import type { SchemaSubject } from 'types';
import { formatJSONContent } from 'utils/formatter';

export const exportSchemaZip = (subject: SchemaSubject, mode: 'all' | 'latest') => {
  return getSchema(subject).then((schemas) => {
    const zip = new JSZip();
    const _schemas = mode === 'all' ? schemas : [schemas[schemas.length - 1]];
    for (const schema of _schemas) {
      zip.file(`${schema.subject}.v${schema.version}.json`, formatJSONContent(schema.schema));
    }

    return zip
      .generateAsync({ type: 'blob' })
      .then((content) => saveAs(content, `schema.${subject}.${mode}.${Date.now()}.zip`));
  });
};

export const exportAllSchemasZip = (mode: 'all' | 'latest') => {
  return getSubjects()
    .then((subjects) => {
      return Promise.all(subjects.map(getSchema));
    })
    .then((results) => {
      const zip = new JSZip();
      for (const schemas of results) {
        const _schemas = mode === 'all' ? schemas : [schemas[schemas.length - 1]];
        for (const schema of _schemas) {
          zip.file(`${schema.subject}.v${schema.version}.json`, formatJSONContent(schema.schema));
        }
      }

      return zip
        .generateAsync({ type: 'blob' })
        .then((content) => saveAs(content, `schemas.${mode}.${Date.now()}.zip`));
    });
};
