/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
  ImageListItem,
  ImageList,
  IconButton,
  Tooltip,
  Divider,
  CardHeader,
  Box,
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { css, jsx } from '@emotion/react';
import { getDump } from '../../services/dumpServices';
import { formatDate } from '../../utils/utils';
import CleaningForm from './components/CleaningForm';
import Gallery from '../Admin/Dumps/components/Gallery';

const styles = {
  dumpInfos: css`
   margin-top: 30px;
  `,
  title: css`
  font-size: 18px;
    margin-bottom: 10px;
    color: #5c5c5c;
  `,
  text: css`
  font-size: 16px;
    margin-bottom: 5px;
    margin-left: 5px;
    color: #6d6d6d;
  `,
  section: css`
    margin-bottom: 30px;
  `,
  buttons: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-left: 10px;
  `,
  button: css`
    margin-bottom: 15px;
  `,
};

const Dump = () => {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [dump, setDump] = useState({});

  useEffect(() => {
    getDump(params.dumpId).then((res) => {
      setDump(res.data);
    });
  }, []);

  const srcset = (image, size, rows = 1, cols = 1) => ({
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  if (dump && dump.accessible) {
    return (
      <>
        <Card sx={{
          minWidth: 275, marginTop: '30px', marginBottom: '40px', padding: '20px',
        }}
        >
          <CardHeader title="Informations" subheader={`décharge créée le: ${formatDate(dump.created_at)}`} />
          <CardContent>
            <Box sx={{ height: '400px' }}>
              <Typography sx={{
                display: 'flex', flexDirection: 'row', fontSize: '12px', color: '#7D7D7D',
              }}
              >
                Statut:
                <Typography sx={{ fontSize: '12px', marginLeft: '5px' }}>
                  {dump.status === 'open' ? 'Ouverte' : 'En attente'}
                </Typography>
              </Typography>
              <Gallery pictures={dump.pictures} height="auto" width="500px" />
            </Box>
            <Divider variant="middle" />
            <div css={styles.dumpInfos}>
              <div css={styles.section}>
                <Typography variant="subtitle2" sx={styles.title}>Description:</Typography>
                <Typography variant="body2" sx={styles.text}>{dump.comment}</Typography>
              </div>
              <div css={styles.section}>
                <Typography variant="subtitle2" sx={styles.title}>Décharge accessible:</Typography>
                {dump.accessible.onCar && <Typography variant="body2" sx={styles.text}>En voiture</Typography>}
                {dump.accessible.onFoot && <Typography variant="body2" sx={styles.text}>A pied</Typography>}
              </div>
              <div css={styles.section}>
                <Typography variant="subtitle2" sx={styles.title}>Equipements nécessaires au nettoyage: </Typography>
                {dump.equipments.map((equipment, index) => (
                  <Typography
                    variant="body2"
                    key={`equipment-${index + 1}`}
                    sx={styles.text}
                  >
                    {equipment.name}
                  </Typography>
                ))}
              </div>
            </div>
          </CardContent>
          <CardActions sx={styles.buttons}>
            {dump.status === 'open'
            && (
            <Button
              size="medium"
              variant="contained"
              sx={styles.button}
              onClick={handleOpen}
            >
              Nettoyer la décharge
            </Button>
            )}
            {dump.status === 'waiting'
            && (
            <Typography
              variant="body1"
              sx={styles.text}
            >
              En cours de nettoyage...
            </Typography>
            )}
            <Tooltip title="signaler la décharge" placement="top-end">
              <IconButton size="small" variant="contained" sx={styles.button}>
                <HelpIcon color="neutral" />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
        <CleaningForm dumpId={dump._id} open={open} setOpen={setOpen} />
      </>
    );
  }
  return (<CircularProgress />);
};

export default Dump;
