import React, { FC, useEffect, useState } from 'react';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

import { Mode } from 'types';
import { accessMode } from 'constants/mode';

import type { IModeSelectProps } from './types';

export const ModeSelect: FC<IModeSelectProps> = ({ onChange, value, label = 'Global Mode', ...rest }) => {
  const [mode, setMode] = useState(value);

  useEffect(() => {
    setMode(value);
  }, [value]);

  const id = 'mode-input';

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size="medium">
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          labelId={id}
          id="schema-mode-select"
          label={label}
          onChange={(e) => onChange(e.target.value as Mode)}
          value={mode ?? ''}
          size="medium"
          {...rest}
        >
          {Object.entries(accessMode).map(([key, value]) => (
            <MenuItem value={value} key={key}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ModeSelect;
