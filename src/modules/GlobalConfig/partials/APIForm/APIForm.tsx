import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

import APIStore from 'modules/API/store';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const APIForm = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(APIStore.getBaseUrl() ?? '');

  const saveUrl = () => {
    APIStore.setBaseUrl(value);
    toast.success('The new api url is saved');
    navigate('/');
    window.location.reload();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
      <TextField
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
        variant="outlined"
        label="API url"
        size="small"
        fullWidth
      />
      <Button onClick={saveUrl} variant="outlined">
        Save
      </Button>
    </Box>
  );
};

export default APIForm;
