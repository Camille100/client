/* eslint-disable no-unused-vars */
/** @jsxRuntime classic */
/** @jsx jsx */
import {
  Avatar,
  Card,
  Typography,
  LinearProgress,
  CircularProgress,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { css, jsx } from '@emotion/react';

const styles = {
  container: css`
     margin-top: 30px;
    `,
  card: css`
     margin-top: 30px;
     padding: 20px;
    `,
};

const Account = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log(user.level.totalXp);
    console.log(user.level.xpToLevelUp);
    setProgress((user.level.xpToLevelUp / user.level.totalXp) * 100);
    setLoading(false);
  }, []);
  console.log(progress);
  return (
    <div css={styles.container}>
      {loading
        ? <CircularProgress />
        : (
          <>
            <Card sx={styles.card}>
              <Avatar alt="avatar" src={user.avatar} />
              <Typography>Pseudo</Typography>
              <Typography>{user.pseudo}</Typography>
              <Typography>Adresse mail</Typography>
              <Typography>{user.email}</Typography>
            </Card>
            <Card sx={styles.card}>
              <Typography>Level</Typography>
              <Typography>{user.level.level}</Typography>
              <Typography>XP</Typography>
              <LinearProgress variant="determinate" value={progress} />
            </Card>
          </>
        )}

    </div>
  );
};

export default Account;
