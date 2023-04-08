import React, { FC, useState } from 'react';
import { DiffEditor } from '@monaco-editor/react';
import { Box } from '@mui/material';

import type { SchemaVersion } from 'types';
import { formatJSONContent } from 'utils/formatter';

import VersionSelect from '../VersionSelect';
import type { IHistoryFormProps } from './types';

const HistoryForm: FC<IHistoryFormProps> = ({ history, versions }) => {
  const [originalVersion, setOriginalVersion] = useState<SchemaVersion>(
    history[history.length - 1]?.version ?? -1,
  );
  const [modifiedVersion, setModifiedVersion] = useState<SchemaVersion>(
    history[history.length - 2]?.version ?? -1,
  );

  const originalSchema = history.find(({ version }) => version === originalVersion)?.schema ?? '';
  const modifiedSchema = history.find(({ version }) => version === modifiedVersion)?.schema ?? '';

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

      <DiffEditor
        original={formatJSONContent(modifiedSchema)}
        modified={formatJSONContent(originalSchema)}
        language="json"
        height="100%"
        width="100%"
        options={{ minimap: { enabled: false } }}
      />
    </Box>
  );
};

export default HistoryForm;
