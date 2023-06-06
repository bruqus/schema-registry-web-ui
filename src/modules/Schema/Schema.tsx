import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Tab, Tabs, Typography, Card, IconButton, CircularProgress } from '@mui/material';

import RefreshIcon from 'components/RefreshIcon';
import { SchemaSubject } from 'types';

import VersionSelect from './partials/VersionSelect';
import TabPanel from './partials/TabPanel';
import CompatibilityForm from './partials/CompatibilityForm';
import EditForm from './partials/EditForm';
import HistoryForm from './partials/HistoryForm';
import InfoForm from './partials/InfoForm';
import ExportForm from './partials/ExportForm';
import ModeForm from './partials/ModeForm';
import { useCurrentSchema, useSchemaEditing } from './hooks';

const SchemaComponent = () => {
  const { subject = '', version: paramVersion = 'latest' } = useParams<{
    subject: SchemaSubject;
    version: string;
  }>();
  const [activeTab, setActiveTab] = useState(0);

  const { currSchema, version, refreshSchema, versions, isLoading } = useCurrentSchema(subject, paramVersion);

  const {
    isEditing,
    changes,
    emitSchemaUpdated,
    disableEditingMode,
    handleChangeMode,
    handleSchemaRemove,
    handleVersionChange,
    handleSchemaSchemaChange,
  } = useSchemaEditing(subject, currSchema?.schema);

  const handleRefreshSchema = () => {
    refreshSchema().then(disableEditingMode);
  };

  const handleSchemaUpdate = () => {
    emitSchemaUpdated();
    if (version === 'latest') {
      handleRefreshSchema();
    } else {
      disableEditingMode();
      handleVersionChange('latest');
    }
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {isLoading ? (
        <CircularProgress sx={{ marginX: 'auto', marginY: 'auto' }} />
      ) : (
        <>
          <Box p={2} pb={0} display="flex" justifyContent="space-between" gap={2} flexWrap="wrap">
            <Box>
              <Typography variant="subtitle2" component="div" noWrap sx={{ userSelect: 'none' }}>
                Schema Subject:{' '}
                <Typography color="primary" variant="h5" component="span" sx={{ userSelect: 'text' }}>
                  {currSchema?.subject}
                </Typography>
              </Typography>

              <Typography variant="subtitle2" component="div" sx={{ userSelect: 'none' }}>
                Schema Id:{' '}
                <Typography color="primary" variant="h5" component="span" sx={{ userSelect: 'text' }}>
                  {currSchema?.id}
                </Typography>
              </Typography>
            </Box>

            {versions.length > 1 ? (
              <VersionSelect versions={versions} onChange={handleVersionChange} value={currSchema?.version} />
            ) : (
              <Typography color="primary" variant="h6" component="span" noWrap>
                Version {currSchema?.version}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Tabs value={activeTab} onChange={(_, newTab) => setActiveTab(newTab)}>
              <Tab label="Schema" />
              <Tab label="Info" />
              <Tab label="Compatibility" />
              <Tab label="Mode" />
              <Tab label="Export" />
              {Number(currSchema?.version) > 1 && <Tab label="History" />}
            </Tabs>

            <IconButton sx={{ marginRight: 1 }} onClick={handleRefreshSchema}>
              <RefreshIcon width={24} height={24} />
            </IconButton>
          </Box>

          <TabPanel value={activeTab} index={0} height="100%">
            <EditForm
              schema={currSchema}
              multiVersion={versions.length > 1}
              changes={changes}
              onChange={handleSchemaSchemaChange}
              onUpdate={handleSchemaUpdate}
              onRemove={handleSchemaRemove}
              isEditing={isEditing}
              onChangeMode={handleChangeMode}
            />
          </TabPanel>

          <TabPanel p={2} value={activeTab} index={1} overflow="auto">
            <InfoForm schema={currSchema} />
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
            <HistoryForm subject={subject} versions={versions} />
          </TabPanel>
        </>
      )}
    </Card>
  );
};

export default SchemaComponent;
