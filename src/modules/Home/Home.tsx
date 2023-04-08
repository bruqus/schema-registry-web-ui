import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { ROUTE_SCHEMA_NEW } from 'constants/routes';

const Home = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="100%">
      <Typography variant="body1">
        Welcome to the{' '}
        <Typography variant="inherit" component="span" fontWeight="bold">
          schema registry web ui
        </Typography>
      </Typography>

      <Typography variant="body1">
        select a schema or{' '}
        <Link to={ROUTE_SCHEMA_NEW}>
          <Typography component="span" variant="inherit" color="primary">
            create a new one
          </Typography>
        </Link>
      </Typography>
    </Box>
  );
};

export default Home;
