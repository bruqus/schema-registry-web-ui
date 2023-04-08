import React from 'react';
import { Box, Button, Typography } from '@mui/material';

import CompatibilitySelect from 'components/CompatibilitySelect';

import { useCompatibility } from './hooks';

const CompatibilityForm = () => {
  const { savedCompatibility, compatibility, setCompatibility, updateCompatibility } = useCompatibility();

  return (
    <Box>
      {savedCompatibility && (
        <Typography variant="body1" mb={2}>
          Current compatibility level is [{savedCompatibility}]
        </Typography>
      )}

      <Typography mb={1}>Change global compatibility level to:</Typography>

      <CompatibilitySelect
        value={compatibility}
        onChange={(mode) => setCompatibility(mode)}
        label="Global Compatibility"
      />

      <Button variant="outlined" onClick={updateCompatibility} sx={{ mt: 1 }}>
        Update
      </Button>
    </Box>
  );
};

export default CompatibilityForm;
