/* eslint-disable no-unused-vars */
/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { css, jsx } from '@emotion/react';
import {
  Card,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  Icon,
  Typography,
  Button,
  Container,
  Divider,
} from '@mui/material';
import { AlternateEmail } from '@mui/icons-material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTheme } from '@mui/material/styles';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/userSlice';
import { openToast } from '../../redux/slices/toastSlice';
import logo from '../../logo_cat_only.png';
import logoText from '../../logo_bar.png';

import { login } from '../../services/authServices';

const Login = () => {
  const theme = useTheme();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const styles = {
    container: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    height: 100%;
    min-height: 300px;
    width: 100%;
    max-width: 600px;
    margin-top: 10%;
    `,
    logoContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justfy-content: center;
    height: 100%;
    width: 30%;
    @media (max-width: 420px) {
      display: none;
    }
    `,
    logo: css`
    height: 100%;
    max-height: 250px;
    // margin: 20px;
    `,
    containerRight: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justfy-content: center;
    width: 70%;
    height: 100%;
    margin: 0;
    padding: 20px;
    @media (max-width: 420px) {
      width: 100%;
      padding: 20px 0px 20px 0px;
    }
    `,
    divider: css`
    @media (max-width: 420px) {
      display: none;
    }
    `,
    formContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    `,
    form: css`
    height: 100%;
    `,
    title: css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 30px;
    `,
    titleText: css`
    @media (max-width: 420px) {
      font-size: 20px;
    }
    `,
    logoText: css`
    height: 100%;
    max-height: 50px;
    margin-left: 20px;
    `,
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleForm = async () => {
    const res = await login(form);
    if (res.status === 200) {
      localStorage.setItem('auth', JSON.stringify(res.data.accessToken));
      dispatch(loginUser(res.data));
      dispatch(openToast({ message: 'Connexion réussie', severity: 'success' }));
      navigate('/');
    } else {
      dispatch(openToast({ message: 'Connexion échouée', severity: 'error' }));
    }
  };

  return (
    <Card
      sx={styles.container}
      onKeyPress={(e) => {
        // e.preventDefault();
        if (e.key === 'Enter') {
          handleForm();
        }
      }}
    >
      <Container sx={styles.logoContainer}>
        <img css={styles.logo} src={logo} alt="" />
      </Container>
      <Divider orientation="vertical" flexItem sx={styles.divider} />
      <Container sx={styles.containerRight}>
        <Container sx={styles.formContainer}>
          <div css={styles.title}>
            <Typography variant="h5" sx={styles.titleText}>Se connecter</Typography>
            <img css={styles.logoText} src={logoText} alt="" />
          </div>
          <FormControl sx={styles.form} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              endAdornment={(
                <InputAdornment position="end">
                  <Icon
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <AlternateEmail />
                  </Icon>
                </InputAdornment>
            )}
              label="Email"
            />
          </FormControl>
          <FormControl sx={styles.form} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Se connecter</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'password' : 'text'}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
            )}
              label="Password"
            />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleForm}
          >
            Se connecter

          </Button>
          <Typography variant="caption">
            Pas encore inscrit? c&apos;est par
            {' '}
            <Link to="/register">ici</Link>
          </Typography>
        </Container>
      </Container>
    </Card>
  );
};

export default Login;
