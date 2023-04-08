import React, { FC, useEffect, useState } from 'react';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

import { compatibilityLevel } from 'constants/config';
import { Compatibility } from 'types';

import { ICompatibilityLevelSelectProps } from './types';

export const CompatibilityLevelSelect: FC<ICompatibilityLevelSelectProps> = ({
  onChange,
  value,
  size = 'medium',
  label = 'Compatibility Level',
  ...rest
}) => {
  const [level, setLevel] = useState(value);

  useEffect(() => {
    setLevel(value);
  }, [value]);

  const id = 'config-input';

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size={size}>
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          labelId={id}
          id="schema-version-select"
          label="Compatibility Level"
          onChange={(e) => onChange(e.target.value as Compatibility)}
          value={level ?? ''}
          size={size}
          {...rest}
        >
          {Object.entries(compatibilityLevel).map(([key, value]) => (
            <MenuItem value={value} key={key}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CompatibilityLevelSelect;
