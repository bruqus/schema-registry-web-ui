import React from 'react';
import Box from '@mui/material/Box';

import type { ITabPanelProps } from './types';

const TabPanel = ({ children, value, index, ...other }: ITabPanelProps) => {
  if (value !== index) return null;

  return (
    <Box role="tabpanel" id={`tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} p={2} {...other}>
      {children}
    </Box>
  );
};

export default TabPanel;
