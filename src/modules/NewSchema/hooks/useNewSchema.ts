import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { registerSubject, checkSubjectRegistered } from 'api/subjects';
import { ROUTE_SCHEMA } from 'constants/routes';
import emitter from 'utils/event-emitter';
import { formatJSONContent } from 'utils/formatter';
import { EVENT_SCHEMA_CREATED } from 'constants/events';
import type { Schema, SchemaSchema } from 'types';

import { sample } from '../constants';

const useNewSchema = (schema: Schema | null) => {
  const navigate = useNavigate();
  const [newSubject, setNewSubject] = useState(schema?.subject ?? '');
  const [schemaSchema, setSchemaSchema] = useState(formatJSONContent(schema?.schema ?? '') || sample);
  const [isSchemaValid, setIsSchemaValid] = useState(false);
  const [isSchemaSchemaValid, setIsSchemaSchemaValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeSchemaSchema = (schemaSchema?: SchemaSchema) => {
    setSchemaSchema(schemaSchema ? schemaSchema.trim() : '');
  };

  const subject = newSubject.trim();

  const validateSchema = async () => {
    if (!isSchemaSchemaValid) {
      return toast.error(`Invalid schema code`);
    }

    if (!subject) {
      return toast.error(`Empty subject`);
    }

    try {
      const candidate = await checkSubjectRegistered(subject, {
        schemaType: 'AVRO',
        schema: schemaSchema,
      });
      if (candidate) {
        return toast.error(`Schema ${subject} already exists`);
      }
    } catch (err) {
      return toast.error(String(err));
    }

    toast.success(`Schema ${subject} is valid`);
    setIsSchemaValid(true);
  };

  const handleChangeNewSubject = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setNewSubject(value);
    setIsSchemaValid(false);
  };

  const createSchema = async () => {
    setIsLoading(true);
    try {
      const schemaId = await registerSubject(subject, {
        schemaType: 'AVRO',
        schema: schemaSchema,
      });
      toast.success(`Schema id ${schemaId}`);
      emitter.emit(EVENT_SCHEMA_CREATED, subject);
      navigate(`${ROUTE_SCHEMA}/${subject}/version/latest`);
    } catch (err) {
      toast.error(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    subject,
    newSubject,
    schemaSchema,
    isLoading,
    isSchemaValid,
    isSchemaSchemaValid,
    validateSchema,
    createSchema,
    setIsSchemaSchemaValid,
    handleChangeNewSubject,
    handleChangeSchemaSchema,
  };
};

export default useNewSchema;
