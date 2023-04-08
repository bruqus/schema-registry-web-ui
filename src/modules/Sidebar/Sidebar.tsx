import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Card, Divider, TextField, Typography } from '@mui/material';

import { ROUTE_GLOBAL_CONFIG } from 'constants/routes';

import SubjectsList from './partials/SubjectsList';
import { useDebouncedSearch, useSubjects } from './hooks';

const Sidebar = () => {
  const subjects = useSubjects();
  const { searchTerm, updateSearchTerm, filterItems } = useDebouncedSearch();
  const filteredSubjects = filterItems(subjects);

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
            Total Schemas:{' '}
            <Typography color="primary" variant="h6" component="span">
              {subjects.length}
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
          value={searchTerm}
          onChange={updateSearchTerm}
          autoComplete="off"
        />
      </Box>

      <Divider />

      <SubjectsList subjects={filteredSubjects} />
    </Card>
  );
};

export default Sidebar;
