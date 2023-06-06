import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getSpecificSubjectVersion, getSubjectVersions } from 'api/subjects';
import type { Schema, SchemaSubject, SchemaVersion } from 'types';
import { ROUTE_INDEX } from 'constants/routes';

const useCurrentSchema = (subject: SchemaSubject, paramVersion: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [versions, setVersions] = useState<SchemaVersion[]>([]);
  const [currSchema, setCurrSchema] = useState<Schema | null>(null);

  const navigate = useNavigate();

  const version = useMemo(() => {
    if (paramVersion === 'latest') return paramVersion;
    const nVersion = Number(paramVersion);
    return Number.isNaN(nVersion) ? -1 : nVersion;
  }, [paramVersion, versions]);

  const refreshSchema = useCallback(
    (v?: SchemaVersion) => {
      setIsLoading(true);
      return Promise.all([getSpecificSubjectVersion(subject, v ?? version), getSubjectVersions(subject)])
        .then(([schema, versions]) => {
          setCurrSchema(schema);
          setVersions(versions);
        })
        .catch((err) => {
          toast.error(String(err));
          navigate(ROUTE_INDEX);
        })
        .finally(() => {
          setIsLoading(false);
          // setIsEditing(false);
        });
    },
    [subject, version, navigate],
  );

  useEffect(() => {
    refreshSchema();
  }, [refreshSchema]);

  return {
    currSchema,
    versions,
    version,
    refreshSchema,
    isLoading,
  };
};

export default useCurrentSchema;
