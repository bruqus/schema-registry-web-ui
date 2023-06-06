import { useDeferredValue, useMemo, useState } from 'react';
import type { Schema } from 'types';

const useSchemasQuery = (schemas: Schema[]) => {
  const [query, setQuery] = useState<string>('');
  const deferredQuery = useDeferredValue(query);

  const updateQuery = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => {
    const value = typeof event === 'string' ? event : event.target.value;
    setQuery(value);
  };

  const isStale = query !== deferredQuery;

  const filteredSchemas = useMemo(
    () => schemas.filter((s) => s.subject.toLowerCase().includes(deferredQuery)),
    [schemas, deferredQuery],
  );

  return {
    query,
    updateQuery,
    filteredSchemas,
    isStale,
  };
};

export default useSchemasQuery;
