/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
} from '@mui/material';
import { css } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { getInvitesByUser, updateInvite } from '../../../services/inviteServices';
import { formatDate } from '../../../utils/utils';
import { openToast } from '../../../redux/slices/toastSlice';

const styles = {
  card: css`
    margin-bottom: 30px;
  `,
  button: css`
    font-size: 12px;
    margin-top: 10px;
    margin-bottom: 10px;
  `,
};

const Invites = ({ userId }) => {
  const [invites, setInvites] = useState([]);
  const dispatch = useDispatch();

  const getInvites = () => {
    getInvitesByUser(userId).then((res) => {
      if (res.status === 200) {
        setInvites(res.data);
      }
    });
  };

  useEffect(() => {
    getInvites();
  }, []);

  const handleInvite = (inviteId, choice) => {
    updateInvite(inviteId, { status: choice }).then((res) => {
      if (res.status === 200) {
        dispatch(openToast({ message: `Invitation ${choice === 'accepted' ? 'acceptée' : 'refusée'}`, severity: 'success' }));
        getInvites();
        return;
      }
      dispatch(openToast({ message: 'Problème dans la mise à jour de l&&apos;invitation', severity: 'error' }));
    });
  };

  return (
    <div>
      {invites && invites.length > 0
        ? invites.map((invite, inviteIndex) => (
          <Card key={`invite-${inviteIndex + 1}`} sx={styles.card}>
            <CardContent>
              <Typography sx={{ fontSize: '13px', color: '#6d6d6d' }}>
                Vous avez été invité(e) par
                {' '}
                {invite.idSender.pseudo ? invite.idSender.pseudo : invite.idSender.email}
                {' '}
                à un évènement ayant lieu le
                {' '}
                {formatDate(invite.idEvent.beginDate)}
              </Typography>
              {invite.status !== 'waiting'
              && (
              <Typography sx={{ fontSize: '13px', color: '#6d6d6d' }}>
                Statut:
                {' '}
                {invite.status === 'accepted' ? 'acceptée' : 'refusée'}
              </Typography>
              )}
            </CardContent>
            {invite.status === 'waiting'
            && (
            <CardActions>
              <Button
                disableElevation
                variant="contained"
                color="paleGreen"
                sx={styles.button}
                onClick={() => handleInvite(invite._id, 'accepted')}
              >
                Accepter
              </Button>
              <Button
                disableElevation
                variant="contained"
                sx={styles.button}
                onClick={() => handleInvite(invite._id, 'refused')}
              >
                Refuser
              </Button>
            </CardActions>
            )}
          </Card>
        ))
        : <Typography>Pas d&apos;invitations</Typography>}
    </div>
  );
};

export default Invites;
