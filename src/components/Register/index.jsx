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
} from '@mui/material';
import { AlternateEmail } from '@mui/icons-material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import logo from '../../logo_bar.png';

import { register } from '../../services/authServices';
import { openToast } from '../../redux/slices/toastSlice';

const styles = {
  container: css`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  width: 100%;
  max-width: 500px;
  padding: 20px;
  gap: 20px;
  margin-top: 10%;
  `,
  form: css`
  m: 1;
  width: 25ch;
  `,
  title: css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
  `,
  logo: css`
  height: 100%;
  max-height: 50px;
  margin-left: 20px;
  `,
};

const Register = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleForm = async () => {
    register(form).then((res) => {
      if (res === 201) {
        dispatch(openToast({ message: 'Enregistrement réussi', severity: 'success' }));
        navigate('/login');
      } else {
        dispatch(openToast({ message: 'Enregistrement "échoué"', severity: 'error' }));
      }
    });
  };

  return (
    <Card sx={styles.container}>
      <div css={styles.title}>
        <Typography variant="h5">S&apos;inscrire</Typography>
        <img css={styles.logo} src={logo} alt="" />
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
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
            )}
          label="Password"
        />
      </FormControl>
      <Button variant="contained" onClick={handleForm}>Se connecter</Button>
      <Typography variant="caption">
        Déjà inscrit? c&apos;est par
        {' '}
        <Link to="/login">ici</Link>
      </Typography>
    </Card>
  );
};

export default Register;
