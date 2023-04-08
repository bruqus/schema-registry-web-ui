import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { getGlobalMode, updateGlobalMode } from 'api/mode';
import type { Mode } from 'types';

const useMode = () => {
  const [savedMode, setSavedMode] = useState<Mode | null>(null);
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    getGlobalMode()
      .then(({ mode }) => {
        setMode(mode);
        setSavedMode(mode);
      })
      .catch((err) => toast.error(String(err)));
  }, []);

  const updateMode = () => {
    if (!mode) return;
    updateGlobalMode(mode)
      .then(({ mode }) => {
        setMode(mode);
        setSavedMode(mode);
        toast.success(`The new global mode is [${mode}]`);
      })
      .catch((err) => toast.error(String(err)));
  };

  return { savedMode, setMode, updateMode, mode };
};

export default useMode;
