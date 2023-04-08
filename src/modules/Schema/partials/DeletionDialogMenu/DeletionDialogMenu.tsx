import React, { FC, useState } from 'react';
import { Button, Menu, MenuItem, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';

import type { IDeletionDialogMenuProps, OptionType } from './types';

export const DeleteDialogMenu: FC<IDeletionDialogMenuProps> = ({
  subject,
  onCancel,
  onConfirm,
  selectedVersion,
  multipleOptions,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [optionType, setOptionType] = useState<OptionType>('subject');

  const menuOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (type: OptionType) => {
    setAnchorEl(null);
    setOptionType(type);
    setDialogOpen(true);
  };

  const handleCancel = () => {
    setDialogOpen(false);
    onCancel?.();
  };

  const handleConfirm = () => {
    onConfirm?.(optionType, selectedVersion);
    setDialogOpen(false);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={menuOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? 'true' : undefined}
        onClick={handleClick}
        variant="outlined"
        color="error"
      >
        Delete
      </Button>

      <Menu id="basic-menu" anchorEl={anchorEl} open={menuOpen} onClose={() => setAnchorEl(null)}>
        {multipleOptions && (
          <MenuItem onClick={() => handleMenuClose('latest')}>Delete Latest Version</MenuItem>
        )}
        {multipleOptions && (
          <MenuItem onClick={() => handleMenuClose('selected')}>
            Delete Selected Version ({selectedVersion})
          </MenuItem>
        )}
        <MenuItem onClick={() => handleMenuClose('subject')}>Delete Subject</MenuItem>
      </Menu>

      <Dialog
        open={dialogOpen}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Schema{' '}
          <Typography component="span" variant="inherit" color="primary">
            {subject}
          </Typography>{' '}
          {optionType !== 'subject' && (
            <>
              version{' '}
              <Typography component="span" variant="inherit" color="primary">
                {optionType === 'selected' ? selectedVersion : 'latest'}
              </Typography>
            </>
          )}{' '}
          will be deleted
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleCancel} autoFocus variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleConfirm} variant="outlined" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialogMenu;
