/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { Container, CircularProgress } from '@mui/material';
import jwtDecode from 'jwt-decode';
import { useSelector, useDispatch } from 'react-redux';
import RoutesWrapper from './RoutesWrapper';
import Toast from '../Reusable/Toast';

import { loginUser } from '../../redux/slices/userSlice';

import { getUser } from '../../services/userServices';

const styles = {
  root: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  `,
};

const Router = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.loggedIn) {
      if (localStorage.getItem('auth')) {
        const userAuth = JSON.parse(localStorage.getItem('auth'));
        const userId = jwtDecode(userAuth);
        getUser({ userId: userId.id }).then((res) => {
          if (res.status === 200) {
            dispatch(loginUser(res.data));
          }
        });
      }
    }
  }, [user]);

  // console.log(user);

  return (
    <Container sx={styles.root}>
      <RoutesWrapper />
      <Toast />
    </Container>
  );
};

export default Router;
