import React from 'react';
import { TextField, Button, Box, Card } from '@mui/material';
import { useLocation } from 'react-router-dom';

import CodeEditor from 'modules/CodeEditor';

import { useNewSchema } from './hooks';

const NewSchema = () => {
  const { state = null } = useLocation();

  const {
    subject,
    newSubject,
    schemaSchema,
    isLoading,
    isSchemaValid,
    isSchemaSchemaValid,
    createSchema,
    validateSchema,
    setIsSchemaSchemaValid,
    handleChangeNewSubject,
    handleChangeSchemaSchema,
  } = useNewSchema(state);

  return (
    <Card
      variant="elevation"
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <TextField
        label="Subject name"
        required
        value={newSubject}
        onChange={handleChangeNewSubject}
        size="small"
        fullWidth
        autoFocus
      />

      <Box display="flex" gap={2} mt={1}>
        <Button onClick={validateSchema} disabled={!subject || isLoading} variant="outlined" color="info">
          Validate
        </Button>

        <Button
          onClick={createSchema}
          variant="outlined"
          color="success"
          disabled={!isSchemaValid || !isSchemaSchemaValid || isLoading}
        >
          Create new schema
        </Button>
      </Box>

      <Box flex={1} mt={2}>
        <CodeEditor
          code={schemaSchema}
          onChange={handleChangeSchemaSchema}
          onCodeValidate={setIsSchemaSchemaValid}
        />
      </Box>
    </Card>
  );
};

export default NewSchema;
