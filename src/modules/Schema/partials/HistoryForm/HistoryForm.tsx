import React, { FC, useState } from 'react';
import { DiffEditor } from '@monaco-editor/react';
import { Box, CircularProgress } from '@mui/material';

import type { SchemaVersion } from 'types';
import { formatJSONContent } from 'utils/formatter';

import VersionSelect from '../VersionSelect';
import type { IHistoryFormProps } from './types';
import { useSchemaSchema } from './hooks';

const HistoryForm: FC<IHistoryFormProps> = ({ versions, subject }) => {
  const [originalVersion, setOriginalVersion] = useState<SchemaVersion>(versions[versions.length - 1]);
  const [modifiedVersion, setModifiedVersion] = useState<SchemaVersion>(versions[versions.length - 2]);

  const { schemaSchema: originalSchema, isLoading: originalIsLoading } = useSchemaSchema(
    subject,
    originalVersion,
  );
  const { schemaSchema: modifiedSchema, isLoading: modifiedIsLoading } = useSchemaSchema(
    subject,
    modifiedVersion,
  );

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={2}>
      <Box display="flex" gap={2}>
        <VersionSelect
          versions={versions}
          onChange={(version) => setModifiedVersion(version)}
          value={modifiedVersion}
        />
        <VersionSelect
          versions={versions}
          onChange={(version) => setOriginalVersion(version)}
          value={originalVersion}
        />
      </Box>

      {originalIsLoading || modifiedIsLoading ? (
        <CircularProgress sx={{ margin: 'auto' }} />
      ) : (
        <DiffEditor
          original={formatJSONContent(modifiedSchema)}
          modified={formatJSONContent(originalSchema)}
          language="json"
          height="100%"
          width="100%"
          options={{ minimap: { enabled: false } }}
        />
      )}
    </Box>
  );
};

export default HistoryForm;
