import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';

import { ROUTE_GLOBAL_CONFIG } from 'constants/routes';
import RefreshIcon from 'components/RefreshIcon';

import SchemasList from './partials/SchemasList';
import useLatestSchemas from './hooks/useLatestSchemas';
import { useSchemasQuery } from './hooks';

const Sidebar = () => {
  const { schemas, refreshSchemas, isLoading } = useLatestSchemas();
  const { query, updateQuery, isStale, filteredSchemas } = useSchemasQuery(schemas);

  return (
    <Card
      variant="elevation"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box p={2}>
        <Button variant="outlined" sx={{ mb: 2 }} fullWidth component={Link} to={ROUTE_GLOBAL_CONFIG}>
          Global Config
        </Button>

        <Divider />

        <Box display="flex" alignItems="center" justifyContent="space-between" my={2}>
          <Typography variant="subtitle2" component="div" noWrap>
            <IconButton onClick={refreshSchemas}>
              <RefreshIcon width={20} height={20} />
            </IconButton>
            Total Schemas:{' '}
            <Typography color="primary" variant="h6" component="span">
              {schemas.length}
            </Typography>
          </Typography>

          <Button component={Link} to="schema/new" variant="outlined" color="success">
            New
          </Button>
        </Box>

        <TextField
          autoFocus
          variant="outlined"
          size="small"
          fullWidth
          label="Search schema"
          type="search"
          value={query}
          onChange={updateQuery}
          autoComplete="off"
        />
      </Box>

      <Divider />

      {isLoading ? (
        <CircularProgress sx={{ marginX: 'auto', marginY: 3 }} />
      ) : (
        <SchemasList schemas={filteredSchemas} isStale={isStale} />
      )}
    </Card>
  );
};

export default Sidebar;
