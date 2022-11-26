/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { calculateLvl } from '../../utils/utils';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedIn: false,
  },
  reducers: {
    loginUser: (state, action) => {
      state.userId = action.payload.id;
      state.email = action.payload.email;
      state.pseudo = action.payload.pseudo || '';
      state.role = action.payload.role;
      state.xp = action.payload.xp;
      state.avatar = action.payload.avatar;
      state.level = calculateLvl(action.payload.xp);
      state.loggedIn = true;
      return state;
    },
    logoutUser: (state, action) => {
      state.loggedIn = action.payload;
    },
    updateUser: (state, action) => {

    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
