import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { deleteSubjectMode, getGlobalMode, getSubjectMode, updateSubjectMode } from 'api/mode';
import type { Mode, SchemaSubject } from 'types';

const useSubjectMode = (subject: SchemaSubject) => {
  const [savedMode, setSavedMode] = useState<Mode | null>(null);
  const [mode, setMode] = useState<Mode | null>(null);
  const [globalMode, setGlobalMode] = useState<Mode | null>(null);

  useEffect(() => {
    getSubjectMode(subject)
      .then((config) => {
        const mode = config?.mode ?? null;
        setMode(mode);
        setSavedMode(mode);
      })
      .catch((err) => toast.error(String(err)));

    getGlobalMode()
      .then((config) => setGlobalMode(config.mode ?? null))
      .catch((err) => toast.error(String(err)));
  }, [subject]);

  const updateMode = () => {
    if (!mode) return;
    updateSubjectMode(subject, mode)
      .then((config) => {
        const mode = config?.mode ?? null;
        setMode(mode);
        setSavedMode(mode);
        toast.success(`Current mode for ${subject} [${mode}]`);
      })
      .catch((err) => toast.error(String(err)));
  };

  const deleteMode = () => {
    deleteSubjectMode(subject)
      .then(() => {
        setSavedMode(null);
        setMode(null);
        toast.success(`The mode was successfully deleted for the ${subject}`);
      })
      .catch((err) => toast.error(String(err)));
  };

  return {
    savedMode,
    mode,
    setMode,
    globalMode,
    deleteMode,
    updateMode,
  };
};

export default useSubjectMode;
