import type { ButtonProps } from '@mui/material';

export type IConfirmButton = ButtonProps & {
  onConfirm?: () => void;
};
