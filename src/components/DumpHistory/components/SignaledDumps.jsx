/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/** @jsxRuntime classic */
/** @jsx jsx */
import { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  // CardActions,
  Button,
  Alert,
} from '@mui/material';
import { css, jsx } from '@emotion/react';
import { formatDate } from '../../../utils/utils';
import Gallery from '../../Admin/Dumps/components/Gallery';
import UpdateDump from './UpdateDump';
import DeleteDump from './DeleteDump';

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
  cardContent: css`
    width: 100%;
    max-width: 800px;
    min-width: 800px;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    @media (max-width: 945px) {
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      min-width: 300px;
    }
  `,
  dumpInfos: css`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    justify-content: space-between;
    @media (max-width: 700px) {
      width: 100%;
    }
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

const SignaledDumps = ({ dumps }) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedDump, setSelectedDump] = useState({});

  const handleUpdateDump = (dump) => {
    setSelectedDump(dump);
    setOpen(true);
  };

  const handleDeleteDump = (dump) => {
    setSelectedDump(dump);
    setOpenDelete(true);
  };

  return (
    <Grid container spacing={2}>
      {dumps.length > 0
        ? dumps.map((dump, indexDump) => (
          <Grid item xs="auto" key={`dump-${indexDump + 1}`}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={styles.cardContent}>
                <div>
                  <div css={styles.section}>
                    <Typography component="span" sx={styles.header}>Informations de la décharge</Typography>
                    <Typography component="span" sx={styles.subheader}>
                      décharge créée le:
                      {' '}
                      {formatDate(dump.created_at)}
                    </Typography>
                  </div>
                  <div css={styles.dumpInfos}>
                    <div css={styles.section}>
                      <Typography component="span" variant="subtitle2" sx={styles.title}>Description:</Typography>
                      <Typography component="span" variant="body2" sx={styles.text}>{dump.comment}</Typography>
                    </div>
                    <div css={styles.section}>
                      <Typography component="span" variant="subtitle2" sx={styles.title}>Décharge accessible:</Typography>
                      {dump.accessible.onCar && <Typography component="span" variant="body2" sx={styles.text}>En voiture</Typography>}
                      {dump.accessible.onFoot && <Typography component="span" variant="body2" sx={styles.text}>A pied</Typography>}
                    </div>
                    <div css={styles.section}>
                      <Typography component="span" variant="subtitle2" sx={styles.title}>Equipements nécessaires au nettoyage: </Typography>
                      {dump.equipments.map((equipment, index) => (
                        <Typography
                          component="span"
                          variant="body2"
                          key={`equipment-${index + 1}`}
                          sx={styles.text}
                        >
                          {equipment.name}
                        </Typography>
                      ))}
                    </div>
                    <div css={styles.section}>
                      <Alert severity="info" component="span" sx={styles.text}>
                        Statut:
                        {' '}
                        {dump.status === 'closed' && 'nettoyée'}
                        {dump.status === 'open' && 'ouverte'}
                        {dump.status === 'waiting' && 'En cours de nettoyage'}
                      </Alert>
                    </div>
                  </div>
                  {dump.status !== 'closed' && dump.status !== 'waiting'
                  && (
                  <div>
                    <Button variant="contained" color="neutral" disableElevation sx={{ marginRight: '10px' }} onClick={() => handleUpdateDump(dump)}>Modifier</Button>
                    <Button variant="contained" disableElevation onClick={() => handleDeleteDump(dump)}>Supprimer</Button>
                  </div>
                  )}
                </div>
                <div style={{ marginTop: '10px' }}>
                  {window.innerWidth < 700
                  && <Gallery pictures={dump.pictures} height={200} width={200} />}
                  {window.innerWidth > 700
                  && <Gallery pictures={dump.pictures} height={400} width={400} />}
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))
        : (
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ minWidth: '724px' }}>
                <Typography component="span">
                  Vous n&apos;avez déclaré aucune décharge
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      {openDelete
        && <DeleteDump open={openDelete} setOpen={setOpenDelete} dumpId={selectedDump._id} />}
      {open
        && <UpdateDump open={open} setOpen={setOpen} dump={selectedDump} />}
    </Grid>
  );
};

export default SignaledDumps;
