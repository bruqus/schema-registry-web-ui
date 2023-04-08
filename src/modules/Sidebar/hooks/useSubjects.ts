import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { getSubjects } from 'api/subjects';
import type { SchemaSubject } from 'types';
import emitter from 'utils/event-emitter';
import { EVENT_SCHEMA_CREATED, EVENT_SCHEMA_DELETED } from 'constants/events';

const useSubjects = () => {
  const [subjects, setSubjects] = useState<SchemaSubject[]>([]);

  useEffect(() => {
    const cb = () => {
      getSubjects()
        .then((subjects) => setSubjects(subjects))
        .catch((err) => toast.error(String(err)));
    };

    emitter.on(EVENT_SCHEMA_CREATED, cb);
    emitter.on(EVENT_SCHEMA_DELETED, cb);
    cb();
  }, []);

  return subjects;
};

export default useSubjects;
