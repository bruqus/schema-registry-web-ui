import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AppRoutes from 'modules/AppRouter';

function App() {
  return (
    <div className="App">
      <AppRoutes />

      <ToastContainer position="bottom-center" />
    </div>
  );
}

export default App;
