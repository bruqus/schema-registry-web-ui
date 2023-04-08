import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Tab, Tabs, Typography, Card } from '@mui/material';

import VersionSelect from './partials/VersionSelect';
import TabPanel from './partials/TabPanel';
import CompatibilityForm from './partials/CompatibilityForm';
import SchemaForm from './partials/SchemaForm';
import HistoryForm from './partials/HistoryForm';
import InfoForm from './partials/InfoForm';
import ExportForm from './partials/ExportForm';
import ModeForm from './partials/ModeForm';
import { useCurrentSchema } from './hooks';

const Schema = () => {
  const { subject = '' } = useParams();
  const [activeTab, setActiveTab] = useState(0);

  const {
    code,
    currentSchema,
    handleChangeCurrentSchema,
    schemaVersions,
    setCode,
    getSchemaHistory,
    schemaHistory,
  } = useCurrentSchema(subject);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box p={2} pb={0} display="flex" justifyContent="space-between" gap={2} flexWrap="wrap">
        <Box>
          <Typography variant="subtitle2" component="div" noWrap sx={{ userSelect: 'none' }}>
            Schema Subject:{' '}
            <Typography color="primary" variant="h5" component="span" sx={{ userSelect: 'text' }}>
              {currentSchema?.subject}
            </Typography>
          </Typography>

          <Typography variant="subtitle2" component="div" sx={{ userSelect: 'none' }}>
            Schema Id:{' '}
            <Typography color="primary" variant="h5" component="span" sx={{ userSelect: 'text' }}>
              {currentSchema?.id}
            </Typography>
          </Typography>
        </Box>

        {schemaVersions.length > 1 ? (
          <VersionSelect
            versions={schemaVersions}
            onChange={handleChangeCurrentSchema}
            value={currentSchema?.version}
          />
        ) : (
          <Typography color="primary" variant="h6" component="span" noWrap>
            Version {currentSchema?.version}
          </Typography>
        )}
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={(_, newTab) => setActiveTab(newTab)}>
          <Tab label="Schema" />
          <Tab label="Info" />
          <Tab label="Compatibility" />
          <Tab label="Mode" />
          <Tab label="Export" />
          {Number(currentSchema?.version) > 1 && <Tab label="History" />}
        </Tabs>
      </Box>

      <TabPanel value={activeTab} index={0} height="100%">
        <SchemaForm
          subject={subject}
          schema={currentSchema}
          multiVersion={schemaHistory.length > 1}
          code={code}
          onChangeCode={(code) => setCode(code ?? '')}
          onUpdate={getSchemaHistory}
        />
      </TabPanel>

      <TabPanel p={2} value={activeTab} index={1} overflow="auto">
        <InfoForm schema={currentSchema} />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <CompatibilityForm subject={subject} />
      </TabPanel>
      <TabPanel value={activeTab} index={3} height="100%">
        <ModeForm subject={subject} />
      </TabPanel>
      <TabPanel value={activeTab} index={4} height="100%">
        <ExportForm subject={subject} />
      </TabPanel>
      <TabPanel value={activeTab} index={5} height="100%">
        <HistoryForm history={schemaHistory} versions={schemaVersions} />
      </TabPanel>
    </Card>
  );
};

export default Schema;
