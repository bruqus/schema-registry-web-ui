import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { registerSubject, checkSubjectRegistered } from 'api/subjects';
import { ROUTE_SCHEMA } from 'constants/routes';
import emitter from 'utils/event-emitter';
import { EVENT_SCHEMA_CREATED } from 'constants/events';

import { sample } from '../constants';

const useNewSchema = () => {
  const navigate = useNavigate();
  const [newSubject, setNewSubject] = useState('');
  const [code, setCode] = useState(sample);
  const [isSchemaValid, setIsSchemaValid] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleCodeChange = (code?: string) => {
    setCode(code ? code.trim() : '');
  };

  const trimmedSubject = newSubject.trim();

  const validateSchema = async () => {
    if (!isCodeValid) {
      return toast.error(`Invalid schema code`);
    }

    if (!trimmedSubject) {
      return toast.error(`Empty subject`);
    }

    try {
      const candidate = await checkSubjectRegistered(trimmedSubject, {
        schemaType: 'AVRO',
        schema: code,
      });
      if (candidate) {
        return toast.error(`Schema ${trimmedSubject} already exists`);
      }
    } catch (err) {
      return toast.error(String(err));
    }

    toast.success(`Schema ${trimmedSubject} is valid`);
    setIsSchemaValid(true);
  };

  const handleChangeNewSubject = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setNewSubject(value);
    setIsSchemaValid(false);
  };

  const createSchema = async () => {
    setIsLoading(true);
    try {
      const schemaId = await registerSubject(trimmedSubject, {
        schemaType: 'AVRO',
        schema: code,
      });
      toast.success(`Schema id ${schemaId}`);
      emitter.emit(EVENT_SCHEMA_CREATED);
      navigate(`${ROUTE_SCHEMA}/${trimmedSubject}`);
    } catch (err) {
      toast.error(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    newSubject,
    handleChangeNewSubject,
    validateSchema,
    createSchema,
    isSchemaValid,
    isLoading,
    isCodeValid,
    code,
    handleCodeChange,
    setIsCodeValid,
    trimmedSubject,
  };
};

export default useNewSchema;
