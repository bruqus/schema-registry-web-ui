import React, { FC, useState } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';

import type { IConfirmButton } from './types';

const ConfirmButton: FC<IConfirmButton> = ({ onConfirm, onClick, ...buttonProps }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    onClick?.(event);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'confirm-menu';

  return (
    <Box>
      <Button
        aria-controls={isOpen ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        onClick={handleClick}
        variant="outlined"
        color="error"
        {...buttonProps}
      />
      <Menu id={menuId} anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
        <MenuItem onClick={onConfirm}>Confirm</MenuItem>
      </Menu>
    </Box>
  );
};

export default ConfirmButton;
