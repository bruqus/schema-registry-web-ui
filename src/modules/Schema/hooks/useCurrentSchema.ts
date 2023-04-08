import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import type { SchemaSubject, Schema } from 'types';
import { ROUTE_INDEX } from 'constants/routes';
import { EVENT_SCHEMA_DELETED } from 'constants/events';
import { getSubjectVersions, getSpecificSubjectVersion } from 'api/subjects';
import emitter from 'utils/event-emitter';

const useCurrentSchema = (subject: SchemaSubject) => {
  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const [schemaHistory, setSchemaHistory] = useState<Schema[]>([]);
  const [currentSchema, setCurrentSchema] = useState<Schema | null>(null);

  const schemaVersions = useMemo(() => schemaHistory.map((el) => el.version), [schemaHistory]);

  const getSchemaHistory = useCallback(() => {
    return getSubjectVersions(subject)
      .then((versions) => Promise.allSettled(versions.map((v) => getSpecificSubjectVersion(subject, v))))
      .then((results) => {
        const history: Schema[] = [];
        results.forEach((result) => {
          if (result.status === 'rejected') {
            toast.error(result.reason.message);
          } else if (result.status === 'fulfilled') {
            history.push(result.value);
          }
        });
        if (results.length === history.length) {
          setSchemaHistory(history);
          setCurrentSchema(history[history.length - 1]);
        }

        if (history.length === 0) {
          emitter.emit(EVENT_SCHEMA_DELETED);
          navigate(ROUTE_INDEX);
        }
      })
      .catch((err) => {
        toast.error(String(err));
        navigate(ROUTE_INDEX);
      });
  }, [navigate, subject]);

  useEffect(() => {
    getSchemaHistory();
  }, [getSchemaHistory]);

  useEffect(() => {
    if (currentSchema?.schema) {
      setCode(currentSchema.schema);
    }
  }, [currentSchema?.schema]);

  const handleChangeCurrentSchema = (version: number) => {
    const candidate = schemaHistory.find((schema) => schema.version === version);
    setCurrentSchema(candidate ?? null);
  };

  return {
    currentSchema,
    handleChangeCurrentSchema,
    code,
    schemaVersions,
    schemaHistory,
    getSchemaHistory,
    setCode,
  };
};

export default useCurrentSchema;
