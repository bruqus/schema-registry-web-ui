import React from 'react';
import { Box, Button } from '@mui/material';
import { toast } from 'react-toastify';

import { exportAllSchemasZip } from 'modules/Exporter';

const ExportForm = () => {
  const exportSchemas = (mode: 'all' | 'latest') => {
    exportAllSchemasZip(mode).catch((err) => toast.error(String(err)));
  };

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button variant="outlined" onClick={() => exportSchemas('all')}>
        Download all
      </Button>
      <Button variant="outlined" onClick={() => exportSchemas('latest')}>
        Download latest
      </Button>
    </Box>
  );
};

export default ExportForm;
