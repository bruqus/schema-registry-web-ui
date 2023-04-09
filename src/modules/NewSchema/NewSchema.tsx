import React from 'react';
import { TextField, Button, Box, Card } from '@mui/material';

import CodeEditor from 'modules/CodeEditor';
import { useNewSchema } from './hooks';

const NewSchema = () => {
  const {
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
  } = useNewSchema();

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
        <Button
          onClick={validateSchema}
          disabled={!trimmedSubject || isLoading}
          variant="outlined"
          color="info"
        >
          Validate
        </Button>

        <Button
          onClick={createSchema}
          variant="outlined"
          color="success"
          disabled={!isSchemaValid || !isCodeValid || isLoading}
        >
          Create new schema
        </Button>
      </Box>

      <Box flex={1} mt={2}>
        <CodeEditor code={code} onChange={handleCodeChange} onCodeValidate={setIsCodeValid} />
      </Box>
    </Card>
  );
};

export default NewSchema;