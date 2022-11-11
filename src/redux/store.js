/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { userSlice } from './slices/userSlice';
import { toastSlice } from './slices/toastSlice';

// const logger = reduxLogger.createLogger();

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    toast: toastSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
