import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { getSpecificSubjectVersion, getSubjects } from 'api/subjects';
import type { Schema, SchemaSubject } from 'types';
import emitter from 'utils/event-emitter';
import { EVENT_SCHEMA_CREATED, EVENT_SCHEMA_DELETED, EVENT_SCHEMA_UPDATED } from 'constants/events';

const useLatestSchemas = () => {
  const [schemas, setSchemas] = useState<Schema[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshSchemas = useCallback(() => {
    setIsLoading(true);
    getSubjects()
      .then((subjects) => Promise.all(subjects.map((subj) => getSpecificSubjectVersion(subj, 'latest'))))
      .then((schemas) => setSchemas(schemas))
      .catch((err) => toast.error(String(err)))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    refreshSchemas();
  }, [refreshSchemas]);

  useEffect(() => {
    const removeHandler = (subject: SchemaSubject) => {
      setSchemas((prev) => prev.filter((s) => s.subject !== subject));
    };

    const addHandler = async (subject: SchemaSubject) => {
      setIsLoading(true);
      getSpecificSubjectVersion(subject, 'latest')
        .then((schema) => setSchemas((prev) => [...prev.filter((s) => s.subject !== subject), schema]))
        .catch((err) => toast.error(String(err)))
        .finally(() => setIsLoading(false));
    };

    emitter.on(EVENT_SCHEMA_CREATED, addHandler);
    emitter.on(EVENT_SCHEMA_UPDATED, addHandler);
    emitter.on(EVENT_SCHEMA_DELETED, removeHandler);

    return () => {
      emitter.off(EVENT_SCHEMA_DELETED, removeHandler);
      emitter.off(EVENT_SCHEMA_UPDATED, addHandler);
      emitter.off(EVENT_SCHEMA_DELETED, removeHandler);
    };
  }, []);

  return { schemas, refreshSchemas, isLoading };
};

export default useLatestSchemas;
