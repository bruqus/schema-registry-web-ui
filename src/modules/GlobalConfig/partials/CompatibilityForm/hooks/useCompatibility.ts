import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import type { Compatibility } from 'types';
import { getGlobalCompatibility, updateGlobalCompatibility } from 'api/compatibility';

const useCompatibility = () => {
  const [savedCompatibility, setSavedCompatibility] = useState<Compatibility | null>(null);
  const [compatibility, setCompatibility] = useState<Compatibility | null>(null);

  useEffect(() => {
    getGlobalCompatibility()
      .then(({ compatibilityLevel: compatibility }) => {
        setCompatibility(compatibility);
        setSavedCompatibility(compatibility);
      })
      .catch((err) => toast.error(String(err)));
  }, []);

  const updateCompatibility = () => {
    if (!compatibility) return;
    updateGlobalCompatibility(compatibility)
      .then(({ compatibility }) => {
        setCompatibility(compatibility);
        setSavedCompatibility(compatibility);
        toast.success(`The new global compatibility level is [${compatibility}]`);
      })
      .catch((err) => toast.error(String(err)));
  };

  return { savedCompatibility, compatibility, setCompatibility, updateCompatibility };
};

export default useCompatibility;
