import React, { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CompatibilityLevelSelect from 'components/CompatibilitySelect';
import ConfirmButton from 'components/ConfirmButton';

import type { ICompatibilityFormProps } from './types';
import { useSubjectCompatibility } from './hooks';

const CompatibilityForm: FC<ICompatibilityFormProps> = ({ subject }) => {
  const {
    savedCompatibility,
    globalCompatibility,
    setCompatibility,
    compatibility,
    updateCompatibility,
    deleteCompatibility,
  } = useSubjectCompatibility(subject);

  const subjectEl = (
    <Typography component="span" variant="inherit" fontWeight="bold">
      {subject}
    </Typography>
  );

  return (
    <Box>
      <Typography variant="body1">
        {savedCompatibility ? (
          <>
            Current compatibility level for {subjectEl} [{savedCompatibility}]
          </>
        ) : (
          <>
            Schema {subjectEl} uses the global compatibility level [{globalCompatibility}]
          </>
        )}
      </Typography>

      <Box mt={2} display="flex" flexDirection="column" gap={1}>
        <Typography>Change compatibility level to:</Typography>
        <CompatibilityLevelSelect
          value={compatibility}
          onChange={(level) => setCompatibility(level)}
          autoFocus
        />
        <Box display="flex" gap={2}>
          <Button
            disabled={!compatibility}
            variant="outlined"
            sx={{ alignSelf: 'flex-start' }}
            onClick={updateCompatibility}
          >
            Update
          </Button>

          {savedCompatibility && (
            <ConfirmButton onConfirm={deleteCompatibility} color="error">
              Delete
            </ConfirmButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CompatibilityForm;
