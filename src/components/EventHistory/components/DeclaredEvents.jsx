/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/** @jsxRuntime classic */
/** @jsx jsx */
import { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
} from '@mui/material';
import { css, jsx } from '@emotion/react';
import { VerticalAlignTop, Add } from '@mui/icons-material';
import { formatDate, truncateString } from '../../../utils/utils';
import UpdateEvent from './UpdateEvent';
import ParticipantsSelection from './ParticipantsSelection';
import DeleteEvent from './DeleteEvent';

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
  sectionParticipants: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `,
  button: css`
    font-size: 12px;
    margin-bottom: 1px;
    width: 100%;
  `,
  buttonGroup: css`
   justifySelf: flex-end;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: flex-start;
   width: 100%;
  `,
};

const DeclaredEvents = ({ events }) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openInvite, setOpenInvite] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  const handleInvite = () => {
    setOpenInvite(true);
  };

  const handleDeleteEvent = (event) => {
    setSelectedEvent(event);
    setOpenDelete(true);
  };

  return (
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
                      {formatDate(event.beginDate)}
                    </Typography>
                    <Typography component="span" variant="body2" sx={styles.text}>
                      Fin:
                      {' '}
                      {formatDate(event.endDate)}
                    </Typography>
                  </div>
                  <div css={styles.section}>
                    <Typography component="span" variant="subtitle2" sx={styles.title}>Statut:</Typography>
                    <Typography component="span" variant="body2" sx={styles.text}>
                      {event.status === 'public' && 'public'}
                      {event.status === 'private' && 'pivé'}
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
                  <div css={styles.sectionParticipants}>
                    <div css={{
                      display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',
                    }}
                    >
                      <Typography
                        component="span"
                        sx={{
                          fontSize: '12px',
                          fontWeight: 'bold',
                          color: '#5c5c5c',
                        }}
                      >
                        Participants

                      </Typography>
                      {event.status === 'private'
                      && (
                        <Tooltip title="Ajouter des participants" placement="right-start">
                          <IconButton onClick={handleInvite}>
                            <Add />
                          </IconButton>
                        </Tooltip>
                      )}
                    </div>
                    {event.participants.length > 0
                      ? (
                        <List>
                          {event.participants.map((participant, indexParticipant) => (
                            <ListItem key={`participant-${indexParticipant + 1}`}>
                              <Typography
                                sx={styles.text}
                              >
                                {participant.userId.pseudo
                                  ? participant.userId.pseudo
                                  : participant.userId.email}

                              </Typography>
                            </ListItem>
                          ))}
                        </List>
                      )
                      : <Typography component="span" sx={styles.text}>Pas de participants</Typography>}
                    {event.status === 'private'
                     && (
                     <div>
                       {openInvite
                          && (
                          <ParticipantsSelection
                            open={openInvite}
                            setOpen={setOpenInvite}
                            event={event}
                          />
                          )}
                     </div>
                     )}
                  </div>
                </div>
              </CardContent>
              {new Date(event.beginDate) > Date.now()
              && (
              <CardActions disableSpacing sx={styles.buttonGroup}>
                <Button
                  disableElevation
                  variant="contained"
                  size="medium"
                  color="neutral"
                  sx={styles.button}
                  onClick={() => setOpen(true)}
                >
                  Modifier
                </Button>
                <Button
                  disableElevation
                  variant="contained"
                  size="medium"
                  sx={styles.button}
                  onClick={() => handleDeleteEvent(event)}
                >
                  Supprimer
                </Button>
              </CardActions>
              )}
            </Card>
            {open
            && (
            <UpdateEvent
              open={open}
              setOpen={setOpen}
              event={event}
              coordinates={event.center}
            />
            )}
          </Grid>
        ))
        : (
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ minWidth: '724px' }}>
                <Typography component="span">
                  Vous n&apos;avez organisé aucun évènement
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      {openDelete
        && <DeleteEvent open={openDelete} setOpen={setOpenDelete} eventId={selectedEvent._id} />}
    </Grid>
  );
};

export default DeclaredEvents;
