/* eslint-disable no-unused-vars */
/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { css, jsx } from '@emotion/react';
import {
  Avatar,
  Card,
  Typography,
  LinearProgress,
  CircularProgress,
  TextField,
  Button,
  CardHeader,
  Divider,
} from '@mui/material';
import Brightness5Icon from '@mui/icons-material/Brightness5';

import { update } from '../../redux/slices/userSlice';
import { updateUser } from '../../services/userServices';
import { openToast } from '../../redux/slices/toastSlice';

const styles = {
  container: css`
     margin-top: 30px;
     min-width: 370px;
     width: 50vw;
    `,
  card: css`
     margin-top: 30px;
     padding: 20px;
    `,
  avatar: css`
     margin-top: 30px;
    `,
  formSection: css`
      margin-top: 30px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
     `,
  section: css`
      margin-top: 30px;
     `,
  button: css`
      font-size: 11px;
     `,
  info: css`
      width: 80%;
      margin-right: 20px;
     `,
  title: css`
      font-size: 13px;
      font-weight: bold;
      margin-bottom: 15px;
     `,
  level: css`
      font-size: 16px;
      font-weight: bold;
      color: #AB3F21;
      position: relative;
      padding: 15px;
     `,
  icon: css`
      position: absolute;
      top: 6px;
      left: -1px;
      z-index: 999;
      font-size: 40px;
      color: #AB3F21;
  `,
};

const Account = () => {
  const [progress, setProgress] = useState(0);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState({
    pseudo: true,
    email: true,
    password: true,
  });
  const [pseudo, setPseudo] = useState(user.pseudo);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('*********');

  const handleEdit = (name) => {
    if (name === 'pseudo') {
      setDisabled({ ...disabled, pseudo: false });
    } else if (name === 'email') {
      setDisabled({ ...disabled, email: false });
    } else if (name === 'password') {
      setDisabled({ ...disabled, password: false });
    }
  };

  const handleForm = (name) => {
    const body = {
      email,
      pseudo,
      password,
    };
    console.log(body);
    if (name === 'pseudo') {
      setDisabled({ ...disabled, pseudo: true });
    } else if (name === 'email') {
      setDisabled({ ...disabled, email: true });
    } else if (name === 'password') {
      setDisabled({ ...disabled, password: true });
    }
    // updateUser(user.userId, body)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       dispatch(update(res.data));
    //       dispatch(openToast({ message: 'Informations mises à jour', severity: 'success' }));
    //       return;
    //     }
    //     dispatch(openToast({ message: 'Problème dans la mise à jour', severity: 'error' }));
    //   });
  };

  return (
    <div css={styles.container}>
      {!user
        ? <CircularProgress />
        : (
          <>
            <Card sx={styles.card}>
              <Typography variant="h6" color="#6D6D6D" sx={{ marginBottom: '15px' }}>Mon compte</Typography>
              <Divider />
              <Avatar alt="avatar" src={user.avatar} sx={styles.avatar} />
              <div css={styles.formSection}>
                <TextField
                  id="standard-basic"
                  label="Pseudo"
                  variant="standard"
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  sx={styles.info}
                  disabled={disabled.pseudo}
                />
                {disabled.pseudo
                  ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={styles.button}
                      disableElevation
                      onClick={() => handleEdit('pseudo')}
                    >
                      Modifier
                    </Button>
                  )
                  : (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={styles.button}
                      disableElevation
                      onClick={() => handleForm('pseudo')}
                    >
                      Enregistrer
                    </Button>
                  )}
              </div>
              <div css={styles.formSection}>
                <TextField
                  id="standard-basic"
                  label="Adresse mail"
                  variant="standard"
                  value={user.email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={styles.info}
                  disabled={disabled.email}
                />
                {disabled.email
                  ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={styles.button}
                      disableElevation
                      onClick={() => handleEdit('email')}
                    >
                      Modifier
                    </Button>
                  )
                  : (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={styles.button}
                      disableElevation
                      onClick={() => handleForm('email')}
                    >
                      Enregistrer
                    </Button>
                  )}
              </div>
              <div css={styles.formSection}>
                <TextField
                  id="standard-basic"
                  label="Mot de passe"
                  variant="standard"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  sx={styles.info}
                  disabled={disabled.password}
                />
                {disabled.password
                  ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={styles.button}
                      disableElevation
                      onClick={() => handleEdit('password')}
                    >
                      Modifier
                    </Button>
                  )
                  : (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={styles.button}
                      disableElevation
                      onClick={() => handleForm('password')}
                    >
                      Enregistrer
                    </Button>
                  )}
              </div>
            </Card>
            <Card sx={styles.card}>
              <Typography variant="h6" color="#6D6D6D" sx={{ marginBottom: '15px' }}>Informations du joueur</Typography>
              <Divider />
              <div css={styles.section}>
                <Typography sx={styles.title}>Level</Typography>
                <Typography sx={styles.level}>
                  {user.level.level}
                  <Brightness5Icon sx={styles.icon} />
                </Typography>
              </div>
              <div css={styles.section}>
                <Typography sx={styles.title}>XP</Typography>
                <Typography sx={styles.info}>
                  {(user.level.xpOfLevel - user.level.xpToLevelUp)}
                  {' '}
                  /
                  {' '}
                  {user.level.xpOfLevel}
                </Typography>
                <LinearProgress variant="determinate" value={user.level.percentOfLevel} />
              </div>
            </Card>
          </>
        )}

    </div>
  );
};

export default Account;
