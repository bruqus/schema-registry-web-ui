import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

import Layout from 'modules/Layout';
import NewSchema from 'modules/NewSchema';
import Schema from 'modules/Schema';
import GlobalConfig from 'modules/GlobalConfig';
import Home from 'modules/Home';

import { ROUTE_SCHEMA_NEW, ROUTE_INDEX, ROUTE_SCHEMA_ITEM, ROUTE_GLOBAL_CONFIG } from 'constants/routes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTE_INDEX} element={<Layout />}>
        <Route index element={<Home />} />
        <Route element={<Outlet />}>
          <Route index element={<Navigate to="/" replace={true} />} />
          <Route path={ROUTE_SCHEMA_NEW} element={<NewSchema />} />
          <Route path={ROUTE_SCHEMA_ITEM} element={<Schema />} />
          <Route path={ROUTE_GLOBAL_CONFIG} element={<GlobalConfig />} />
        </Route>

        <Route path="*" element={<Navigate to={ROUTE_INDEX} replace={true} />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
