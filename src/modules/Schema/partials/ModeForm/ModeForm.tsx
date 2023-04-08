import React, { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';

import ModeSelect from 'components/ModeSelect';
import ConfirmButton from 'components/ConfirmButton';

import { useSubjectMode } from './hooks';
import type { IModeFormProps } from './types';

const ModeForm: FC<IModeFormProps> = ({ subject }) => {
  const { deleteMode, globalMode, mode, savedMode, updateMode, setMode } = useSubjectMode(subject);

  const subjectEl = (
    <Typography component="span" variant="inherit" fontWeight="bold">
      {subject}
    </Typography>
  );

  return (
    <Box>
      <Typography variant="body1">
        {savedMode ? (
          <>
            Current mode for {subjectEl} [{savedMode}]
          </>
        ) : (
          <>
            Schema {subjectEl} uses the global mode [{globalMode}]
          </>
        )}
      </Typography>

      <Box mt={2} display="flex" flexDirection="column" gap={1}>
        <Typography>Change compatibility level to:</Typography>

        <ModeSelect value={mode} onChange={(mode) => setMode(mode)} autoFocus label="Schema mode" />

        <Box display="flex" gap={2}>
          <Button disabled={!mode} variant="outlined" sx={{ alignSelf: 'flex-start' }} onClick={updateMode}>
            Update
          </Button>

          {savedMode && (
            <ConfirmButton onConfirm={deleteMode} color="error">
              Delete
            </ConfirmButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ModeForm;
