import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { ROUTE_GLOBAL_CONFIG, ROUTE_SCHEMA_NEW } from 'constants/routes';
import APIStore from 'modules/API/store';

const Home = () => {
  const [configured, setConfigured] = useState(false);

  useEffect(() => {
    setConfigured(Boolean(APIStore.getBaseUrl()));
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="100%">
      <Typography variant="body1">
        Welcome to the{' '}
        <Typography variant="inherit" component="span" fontWeight="bold">
          schema registry web ui
        </Typography>
      </Typography>

      {configured ? (
        <Typography variant="body1">
          select a schema or{' '}
          <Link to={ROUTE_SCHEMA_NEW}>
            <Typography component="span" variant="inherit" color="primary">
              create a new one
            </Typography>
          </Link>
        </Typography>
      ) : (
        <Typography variant="body1">
          configure the api url on the{' '}
          <Link to={ROUTE_GLOBAL_CONFIG}>
            <Typography component="span" variant="inherit" color="primary">
              global configuration page
            </Typography>
          </Link>
        </Typography>
      )}
    </Box>
  );
};

export default Home;
