import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import type { SchemaSchema, SchemaSubject, SchemaVersion } from 'types';
import { getSpecificSubjectVersion } from 'api/subjects';

const useSchemaSchema = (subject: SchemaSubject, version: SchemaVersion) => {
  const [isLoading, setIsLoading] = useState(false);
  const [schemaSchema, setSchemaSchema] = useState<SchemaSchema>('');

  useEffect(() => {
    const loadSchema = () => {
      if (!subject) return;
      setIsLoading(true);
      getSpecificSubjectVersion(subject, version)
        .then((schema) => setSchemaSchema(schema.schema))
        .catch((err) => toast.error(String(err)))
        .finally(() => setIsLoading(false));
    };

    loadSchema();
  }, [subject, version]);

  return { isLoading, schemaSchema };
};

export default useSchemaSchema;
