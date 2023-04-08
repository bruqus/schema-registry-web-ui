import React, { FC, useEffect, useRef } from 'react';
import { Box, Button } from '@mui/material';

import CodeEditor, { CodeEditorRef } from 'modules/CodeEditor';

import DeletionDialogMenu from '../DeletionDialogMenu';
import type { ISchemaFormProps } from './types';
import { useSchemaSchema } from './hooks';

const SchemaForm: FC<ISchemaFormProps> = ({
  schema,
  subject,
  multiVersion,
  code,
  onChangeCode,
  onUpdate,
}) => {
  const editorRef = useRef<CodeEditorRef>(null);

  useEffect(() => {
    const timerId = setTimeout(() => editorRef.current?.formatCode(), 10);
    return () => clearTimeout(timerId);
  }, [schema?.schema]);

  const {
    isCompatible,
    handleUpdateSchemaVersion,
    handleCheckSchemaCompatibility,
    handleDeleteSchema,
    setIsCodeValid,
  } = useSchemaSchema({ code, schema, onUpdate, subject });

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={2}>
      <Box display="flex" gap={2}>
        <Button variant="outlined" onClick={editorRef.current?.formatCode}>
          Format
        </Button>

        {isCompatible ? (
          <Button variant="outlined" onClick={handleUpdateSchemaVersion}>
            Evolve
          </Button>
        ) : (
          <Button onClick={handleCheckSchemaCompatibility} variant="outlined">
            Validate
          </Button>
        )}

        <DeletionDialogMenu
          subject={schema?.subject}
          onConfirm={handleDeleteSchema}
          selectedVersion={schema?.version}
          multipleOptions={multiVersion}
        />
      </Box>

      <CodeEditor onCodeValidate={setIsCodeValid} code={code} onChange={onChangeCode} ref={editorRef} />
    </Box>
  );
};

export default SchemaForm;
