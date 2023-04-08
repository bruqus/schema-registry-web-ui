import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
  deleteSubjectCompatibility,
  getGlobalCompatibility,
  getSubjectCompatibility,
  updateSubjectCompatibility,
} from 'api/compatibility';
import { compatibilityLevel } from 'constants/config';
import { Compatibility, SchemaSubject } from 'types';

type NullableCompatibilityLevel = Compatibility | null;

const useSubjectCompatibility = (subject: SchemaSubject) => {
  const [savedCompatibility, setSavedCompatibility] = useState<NullableCompatibilityLevel>(null);
  const [compatibility, setCompatibility] = useState<NullableCompatibilityLevel>(null);
  const [globalCompatibility, setGlobalCompatibility] = useState<NullableCompatibilityLevel>(null);

  useEffect(() => {
    getSubjectCompatibility(subject)
      .then((config) => {
        const level = config?.compatibilityLevel ?? null;
        setCompatibility(level);
        setSavedCompatibility(level);
      })
      .catch((err) => toast.error(String(err)));

    getGlobalCompatibility()
      .then((config) => setGlobalCompatibility(config.compatibilityLevel ?? null))
      .catch((err) => toast.error(String(err)));
  }, [subject]);

  const updateCompatibility = () => {
    if (!compatibility) return;
    if (compatibility === compatibilityLevel.NONE) {
      return deleteCompatibility();
    }
    updateSubjectCompatibility(subject, compatibility)
      .then((config) => {
        const level = config?.compatibility ?? null;
        setCompatibility(level);
        setSavedCompatibility(level);
        toast.success(`Current compatibility for ${subject} [${level}]`);
      })
      .catch((err) => toast.error(String(err)));
  };

  const deleteCompatibility = () => {
    deleteSubjectCompatibility(subject)
      .then(() => {
        setSavedCompatibility(null);
        setCompatibility(null);
        toast.success(`The compatibility was successfully deleted for the ${subject}`);
      })
      .catch((err) => toast.error(String(err)));
  };

  return {
    savedCompatibility,
    globalCompatibility,
    setCompatibility,
    compatibility,
    updateCompatibility,
    deleteCompatibility,
  };
};

export default useSubjectCompatibility;
