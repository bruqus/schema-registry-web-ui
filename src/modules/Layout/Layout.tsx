import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import SchemaList from 'modules/Sidebar';

const Layout = () => {
  return (
    <Box display="flex" gap={2} p={2} height="100vh" flexWrap="wrap" justifyContent="center">
      <Box height="100%" width={350}>
        <Box display="flex" flexDirection="column" height="100%" gap={2}>
          <SchemaList />
        </Box>
      </Box>
      <Box height="100%" sx={{ flex: 1, minWidth: 500, maxWidth: 1000 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
