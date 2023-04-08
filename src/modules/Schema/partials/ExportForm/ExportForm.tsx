import React, { FC } from 'react';
import { Box, Button } from '@mui/material';
import { toast } from 'react-toastify';

import { exportSchemaZip } from 'modules/Exporter';

import { IExportFormProps } from './types';

const ExportForm: FC<IExportFormProps> = ({ subject }) => {
  const exportSchema = (mode: 'all' | 'latest') => {
    exportSchemaZip(subject, mode).catch((err) => toast.error(String(err)));
  };

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button variant="outlined" onClick={() => exportSchema('all')}>
        Download all
      </Button>
      <Button variant="outlined" onClick={() => exportSchema('latest')}>
        Download latest
      </Button>
    </Box>
  );
};

export default ExportForm;
