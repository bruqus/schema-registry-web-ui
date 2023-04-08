import type { BoxProps } from '@mui/material';

export type ITabPanelProps = BoxProps & {
  index: number;
  value: number;
};
