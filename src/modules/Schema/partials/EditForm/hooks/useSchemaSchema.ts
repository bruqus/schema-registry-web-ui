import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { checkSchemaCompatibility } from 'api/compatibility';
import { deleteSubject, registerSubject } from 'api/subjects';
import type { Schema, SchemaSchema } from 'types';

type IUseSchemSchemaProps = {
  code: SchemaSchema;
  subject: SchemaSchema;
  onUpdate?: () => void;
  schema?: Schema | null;
};

const useSchemaSchema = ({ code, subject, onUpdate, schema }: IUseSchemSchemaProps) => {
  const [isCompatible, setIsCompatible] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(true);

  const handleDeleteSchema = (type: 'subject' | 'selected' | 'latest', version?: number) => {
    const vers = type === 'selected' ? version : type === 'latest' ? -1 : undefined;
    deleteSubject(subject, vers)
      .then(() => onUpdate?.())
      .catch((err) => toast.error(String(err)));
  };

  useEffect(() => setIsCompatible(false), [code]);

  const checkSchemaChanged = () => {
    try {
      const source = JSON.parse(schema?.schema ?? '');
      const target = JSON.parse(code);

      return JSON.stringify(source) !== JSON.stringify(target);
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleCheckSchemaCompatibility = () => {
    if (!isCodeValid) {
      return toast.error('Invalid schema');
    }

    if (!checkSchemaChanged()) {
      return toast.warning('You have not changed the schema');
    }
    checkSchemaCompatibility(subject, { schema: code, schemaType: 'AVRO' })
      .then((isCompatible) => {
        setIsCompatible(isCompatible);
        isCompatible
          ? toast.success('This schema is compatible with the latest version')
          : toast.warn('This schema is incompatible with the latest version');
      })
      .catch((err) => toast.error(String(err)));
  };

  const handleUpdateSchemaVersion = () => {
    registerSubject(subject, { schema: code, schemaType: 'AVRO' })
      .then((newId) => {
        if (newId === schema?.id) {
          return toast.warning(`Schema is the same as latest`);
        }
        onUpdate?.();
        toast.success(`Schema ${subject} id ${newId}`);
      })
      .catch((err) => toast.error(String(err)));
  };

  return {
    isCompatible,
    handleUpdateSchemaVersion,
    handleCheckSchemaCompatibility,
    handleDeleteSchema,
    setIsCodeValid,
  };
};

export default useSchemaSchema;
