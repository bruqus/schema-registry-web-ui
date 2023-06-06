import { EVENT_SCHEMA_DELETED, EVENT_SCHEMA_UPDATED } from 'constants/events';
import { ROUTE_INDEX, ROUTE_SCHEMA } from 'constants/routes';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SchemaSchema, SchemaSubject } from 'types';
import emitter from 'utils/event-emitter';
import { formatJSONContent } from 'utils/formatter';

const useSchemaEditing = (subject: SchemaSubject, schemaSchema?: SchemaSchema) => {
  const navigate = useNavigate();

  const formattedCode = useMemo(() => {
    return formatJSONContent(schemaSchema ?? '');
  }, [schemaSchema]);

  const [changes, setChanges] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleChangeMode = ({ isEditing }: { isEditing: boolean }) => {
    setIsEditing(isEditing);
    if (!isEditing) {
      setChanges?.(formattedCode);
    }
  };

  const emitSchemaUpdated = () => {
    emitter.emit(EVENT_SCHEMA_UPDATED, subject);
  };

  const handleSchemaSchemaChange = (changes?: string) => {
    setChanges(changes ?? '');
  };

  const handleSchemaRemove = () => {
    emitter.emit(EVENT_SCHEMA_DELETED, subject);
    navigate(ROUTE_INDEX);
  };

  const disableEditingMode = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    setChanges(formattedCode);
  }, [formattedCode]);

  const handleVersionChange = useCallback(
    (version: number | 'latest') => {
      navigate(`${ROUTE_SCHEMA}/${subject}/version/${version}`);
    },
    [subject, navigate],
  );

  return {
    changes,
    isEditing,
    handleChangeMode,
    disableEditingMode,
    emitSchemaUpdated,
    handleSchemaRemove,
    handleVersionChange,
    handleSchemaSchemaChange,
  };
};

export default useSchemaEditing;
