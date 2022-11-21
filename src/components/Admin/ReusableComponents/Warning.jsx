/* eslint-disable react/prop-types */
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

const Warning = ({
  open, setOpen, setValidate, message,
}) => {
  const handleClose = () => {
    setOpen(false);
  };
  const handleValidate = () => {
    handleClose();
    setValidate(true);
  };
  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Account</DialogTitle>
      <DialogContent>
        {message}
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={handleClose} variant="contained">Annuler</Button>
        <Button color="secondary" onClick={handleValidate} variant="contained">
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Warning;
