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
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { css, jsx } from '@emotion/react';
import { getDump } from '../../services/dumpServices';
import { formatDate } from '../../utils/utils';
import CleaningForm from './components/CleaningForm';

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
        <Card sx={{ minWidth: 275, marginTop: '30px', marginBottom: '40px' }}>
          <CardHeader title="Informations" subheader={`décharge créée le: ${formatDate(dump.created_at)}`} />
          <CardContent>
            <ImageList
              sx={{ minWidth: '500px', marginBottom: '30px', alignSelf: 'center' }}
              variant="quilted"
              cols={3}
              rowHeight={121}
            >
              {dump.pictures.map((item, index) => (
                <ImageListItem key={`img-${index + 1}`} cols={item.cols || 1} rows={item.rows || 1}>
                  <img
                    {...srcset(item, 121, item.rows, item.cols)}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
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
            <Button
              size="medium"
              variant="contained"
              sx={styles.button}
              onClick={handleOpen}
            >
              Nettoyer la décharge
            </Button>
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
