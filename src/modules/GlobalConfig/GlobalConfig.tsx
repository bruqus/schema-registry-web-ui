import React, { useState } from 'react';
import { Box, Card, Tab, Tabs } from '@mui/material';

import TabPanel from 'components/TabPanel';

import ExportForm from './partials/ExportForm';
import ModeForm from './partials/ModeForm';
import CompatibilityForm from './partials/CompatibilityForm';
import APIForm from './partials/APIForm';

const GlobalConfig = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Card variant="elevation" sx={{ p: 2, height: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={(_, newTab) => setActiveTab(newTab)}>
          <Tab label="API" />
          <Tab label="Mode" />
          <Tab label="Compatibility" />
          <Tab label="Export" />
        </Tabs>
      </Box>

      <TabPanel value={activeTab} index={0}>
        <APIForm />
      </TabPanel>

      <TabPanel p={2} value={activeTab} index={1}>
        <ModeForm />
      </TabPanel>
      <TabPanel value={activeTab} index={2} height="100%">
        <CompatibilityForm />
      </TabPanel>
      <TabPanel value={activeTab} index={3}>
        <ExportForm />
      </TabPanel>
    </Card>
  );
};

export default GlobalConfig;
