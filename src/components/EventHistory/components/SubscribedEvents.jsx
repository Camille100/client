/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/** @jsxRuntime classic */
/** @jsx jsx */
import { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { css, jsx } from '@emotion/react';
import pointInPolygon from 'point-in-polygon';
import { useSelector, useDispatch } from 'react-redux';
import { formatDate, formatDateTime, truncateString } from '../../../utils/utils';
import { confirmAttendance } from '../../../services/eventServices';
import { openToast } from '../../../redux/slices/toastSlice';

const styles = {
  header: css`
    font-size: 16px;
    font-weight: bold;
    color: #5c5c5c;
  `,
  subheader: css`
  margin-top: 5px;
    font-size: 12px;
    font-style: italic;
    color: #8D8D8D;
  `,
  card: css`
    width: 100%;
    max-width: 375px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 0px;
  `,
  eventInfos: css`
    margin-top: 30px;
  `,
  title: css`
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 5px;
    color: #5c5c5c;
  `,
  text: css`
    font-size: 13px;
    margin-bottom: 5px;
    color: #6d6d6d;
  `,
  section: css`
    margin-bottom: 25px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `,
};

const SubscribedEvents = ({ events }) => {
  const [userCoordinates, setUserCoordinates] = useState(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserCoordinates([pos.coords.longitude, pos.coords.latitude]);
    });
  }, []);

  const handlePresence = (event) => {
    const polygon = event.location.coordinates[0];
    const isUserInPolygon = pointInPolygon(userCoordinates, polygon);
    if (isUserInPolygon) {
      confirmAttendance(event._id, { userId: user.userId }).then((res) => {
        if (res.status === 200) {
          dispatch(openToast({ message: 'Présence validée', severity: 'success' }));
        } else {
          dispatch(openToast({ message: 'Erreur lors de la validation', severity: 'error' }));
        }
      });
    } else {
      dispatch(openToast({ message: 'Vous n\'êtes pas situé dans la zone de l\'évènement', severity: 'error' }));
    }
  };

  return (
    <div>
      {userCoordinates !== null
        ? (
          <Grid container spacing={2}>
            {events.length > 0
              ? events.map((event, index) => (
                <Grid
                  item
                  xs="auto"
                  key={`event-${index + 1}`}
                  sx={{ width: '100%' }}
                >
                  <Card sx={styles.card}>
                    <CardContent>
                      <div css={styles.section}>
                        <Typography component="span" sx={styles.header}>Informations de l&apos;évènement</Typography>
                        <Typography component="span" sx={styles.subheader}>
                          évènement créé le:
                          {' '}
                          {formatDate(event.created_at)}
                        </Typography>
                      </div>
                      <div css={styles.eventInfos}>
                        <div css={styles.section}>
                          <Typography component="span" variant="subtitle2" sx={styles.title}>Description:</Typography>
                          <Typography component="span" variant="body2" sx={styles.text}>{truncateString(event.comment, 50)}</Typography>
                        </div>
                        <div css={styles.section}>
                          <Typography component="span" variant="subtitle2" sx={styles.title}>Date et heure:</Typography>
                          <Typography component="span" variant="body2" sx={styles.text}>
                            Début:
                            {' '}
                            {formatDateTime(event.beginDate)}
                          </Typography>
                          <Typography component="span" variant="body2" sx={styles.text}>
                            Fin:
                            {' '}
                            {formatDateTime(event.endDate)}
                          </Typography>
                        </div>
                        <div css={styles.section}>
                          <Typography component="span" variant="subtitle2" sx={styles.title}>Evènement accessible:</Typography>
                          {event.accessible.onCar && <Typography component="span" variant="body2" sx={styles.text}>En voiture</Typography>}
                          {event.accessible.onFoot && <Typography component="span" variant="body2" sx={styles.text}>A pied</Typography>}
                        </div>
                        <div css={styles.section}>
                          <Typography component="span" variant="subtitle2" sx={styles.title}>Equipements nécessaires au nettoyage: </Typography>
                          {event.equipments.map((equipment, indexEquipment) => (
                            <Typography
                              component="span"
                              variant="body2"
                              key={`equipment-${indexEquipment + 1}`}
                              sx={styles.text}
                            >
                              {equipment.name}
                            </Typography>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardActions>
                      {new Date(event.beginDate) < Date.now() && new Date(event.endDate) > Date.now() && event.participants.some((item) => item.userId._id.toString() === user.userId.toString() && !item.present)
                    && (
                      <Button
                        color="primary"
                        variant="contained"
                        disableElevation
                        sx={{ fontSize: '12px' }}
                        onClick={() => handlePresence(event)}
                      >
                        Valider présence
                      </Button>
                    )}
                      {event.participants.some((item) => item.userId._id.toString() === user.userId.toString() && item.present === true)
                    && (
                      <Alert severity="success" sx={styles.text}>Présence validée</Alert>
                    )}
                      {new Date(event.beginDate) > Date.now()
                    && (
                      <Alert severity="info" sx={styles.text}>Validation le jour de l&apos;évènement</Alert>
                    )}
                    </CardActions>
                  </Card>
                </Grid>
              ))
              : (
                <Grid item xs={12}>
                  <Card>
                    <CardContent sx={{ minWidth: '724px' }}>
                      <Typography component="span">
                        Vous n&apos;avez participé à aucun évènement
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )}
          </Grid>
        )
        : <CircularProgress />}
    </div>
  );
};

export default SubscribedEvents;
