import React, { FC } from 'react';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

import type { IVersionSelectProps } from './types';

export const VersionSelect: FC<IVersionSelectProps> = ({ versions, onChange, value }) => {
  const id = 'schema-version-input';

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={id}>Version</InputLabel>
        <Select
          labelId={id}
          id="schema-version-select"
          value={String(value)}
          label="Version"
          onChange={(e) => onChange(Number(e.target.value))}
          size="small"
        >
          {versions.map((v) => (
            <MenuItem value={v} key={v}>
              Version {v}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default VersionSelect;
