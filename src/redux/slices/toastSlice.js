/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    open: false,
    message: '',
    severity: 'success',
  },
  reducers: {
    openToast: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      return state;
    },
    closeToast: (state, action) => {
      state.open = false;
      return state;
    },
  },
});

export const { openToast, closeToast } = toastSlice.actions;
