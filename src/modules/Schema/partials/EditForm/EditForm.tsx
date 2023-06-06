import React, { FC, useEffect, useRef, useState } from 'react';
import { Box, Button } from '@mui/material';

import CodeEditor, { CodeEditorRef } from 'modules/CodeEditor';

import DeletionDialogMenu from '../DeletionDialogMenu';
import type { IEditFormProps } from './types';
import { toast } from 'react-toastify';
import { checkSchemaCompatibility } from 'api/compatibility';
import { deleteSubject, registerSubject } from 'api/subjects';

const EditForm: FC<IEditFormProps> = ({
  schema,
  multiVersion,
  changes,
  isEditing,
  onRemove,
  onChange,
  onUpdate,
  onChangeMode,
}) => {
  const editorRef = useRef<CodeEditorRef>(null);

  const [isChangesValid, setIsChangesValid] = useState(true);

  useEffect(() => {
    const timerId = setTimeout(() => editorRef.current?.formatCode(), 10);
    return () => clearTimeout(timerId);
  }, [schema?.schema]);

  const handleDeleteSchema = (type: 'subject' | 'selected' | 'latest', version?: number) => {
    if (!schema?.subject) return;
    const vers = type === 'selected' ? version : type === 'latest' ? -1 : undefined;
    deleteSubject(schema.subject, vers)
      .then(() => (vers === undefined ? onRemove?.() : onUpdate?.()))
      .catch((err) => toast.error(String(err)));
  };

  const handleUpdateSchemaVersion = () => {
    if (!schema?.subject) return;
    registerSubject(schema.subject, { schema: changes, schemaType: 'AVRO' })
      .then((newId) => {
        if (newId === schema?.id) {
          return toast.warning(`Schema is the same as latest`);
        }
        onUpdate?.();
        toast.success(`Schema ${schema.subject} id ${newId}`);
      })
      .catch((err) => toast.error(String(err)));
  };

  const checkSchemaChanged = () => {
    try {
      const source = JSON.parse(schema?.schema ?? '');
      const target = JSON.parse(changes);

      return JSON.stringify(source) !== JSON.stringify(target);
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const [isCompatible, setIsCompatible] = useState(false);

  const handleCheckSchemaCompatibility = () => {
    if (!isChangesValid) {
      return toast.error('Invalid schema');
    }

    if (!checkSchemaChanged()) {
      return toast.warning('You have not changed the schema');
    }
    if (!schema?.subject) return;
    checkSchemaCompatibility(schema.subject, { schema: changes, schemaType: 'AVRO' })
      .then((isCompatible) => {
        setIsCompatible(isCompatible);
        isCompatible
          ? toast.success('This schema is compatible with the latest version')
          : toast.warn('This schema is incompatible with the latest version');
      })
      .catch((err) => toast.error(String(err)));
  };

  const handleSchemaSchemaFormatting = () => {
    editorRef.current?.formatCode();
  };

  const handleSchemaSchemaChange = (changes?: string) => {
    onChange?.(changes);
    if (isCompatible) {
      setIsCompatible(false);
    }
  };

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={2}>
      <Box display="flex" gap={2}>
        {isEditing ? (
          <>
            <Button onClick={handleSchemaSchemaFormatting} variant="outlined">
              Format
            </Button>

            {isCompatible ? (
              <Button variant="outlined" onClick={handleUpdateSchemaVersion} color="success">
                Evolve
              </Button>
            ) : (
              <Button onClick={handleCheckSchemaCompatibility} variant="outlined" color="success">
                Validate
              </Button>
            )}

            <Button onClick={() => onChangeMode?.({ isEditing: false })} variant="outlined" color="error">
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => onChangeMode?.({ isEditing: true })} variant="outlined">
              Edit
            </Button>

            <DeletionDialogMenu
              subject={schema?.subject}
              onConfirm={handleDeleteSchema}
              selectedVersion={schema?.version}
              multipleOptions={multiVersion}
            />
          </>
        )}
      </Box>

      <CodeEditor
        onCodeValidate={setIsChangesValid}
        code={changes}
        onChange={handleSchemaSchemaChange}
        ref={editorRef}
        readOnly={!isEditing}
      />
    </Box>
  );
};

export default EditForm;
