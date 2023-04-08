import React from 'react';
import { Box, Button, Typography } from '@mui/material';

import ModeSelect from 'components/ModeSelect';

import { useMode } from './hooks';

const ModeForm = () => {
  const { savedMode, setMode, updateMode, mode } = useMode();

  return (
    <Box>
      {savedMode && (
        <Typography variant="body1" mb={2}>
          Current mode is [{savedMode}]
        </Typography>
      )}

      <Typography mb={1}>Change global mode to:</Typography>

      <ModeSelect value={mode} onChange={(mode) => setMode(mode)} label="Global Mode" />

      <Button variant="outlined" onClick={updateMode} sx={{ mt: 1 }}>
        Update
      </Button>
    </Box>
  );
};

export default ModeForm;
