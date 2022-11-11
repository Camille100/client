import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { closeToast } from '../../redux/slices/toastSlice';

const Toast = () => {
  const toast = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeToast());
  };

  return (
    <Snackbar open={toast.open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={toast.severity} variant="filled">
        {toast.message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
