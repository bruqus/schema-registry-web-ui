import React, { useEffect, useLayoutEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AppRoutes from 'modules/AppRouter';
import APIStore from 'modules/API/store';
import { ROUTE_GLOBAL_CONFIG } from 'constants/routes';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!APIStore.getBaseUrl()) {
      navigate(ROUTE_GLOBAL_CONFIG);
    }
  }, []);

  return (
    <div className="App">
      <AppRoutes />

      <ToastContainer position="bottom-center" />
    </div>
  );
}

export default App;
