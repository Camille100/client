/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Map, {
  GeolocateControl, Marker,
} from 'react-map-gl';
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
import PlaceIcon from '@mui/icons-material/Place';
import HelpIcon from '@mui/icons-material/Help';
import { css, jsx } from '@emotion/react';
import { getDump } from '../../services/dumpServices';
import { formatDate } from '../../utils/utils';
import CleaningForm from './components/CleaningForm';
import Gallery from '../Admin/Dumps/components/Gallery';

const styles = {
  infos: css`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   margin-top: 30px;
  `,
  dumpInfos: css`
   margin-top: 30px;
   margin-right: 40px;
  `,
  title: css`
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #5c5c5c;
  `,
  text: css`
    font-size: 13px;
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
    margin-top: 30px;
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
  const [viewport, setViewport] = useState({});

  useEffect(() => {
    getDump(params.dumpId).then((res) => {
      setDump(res.data);
      setViewport({
        ...viewport,
        latitude: res.data.location.coordinates[1],
        longitude: res.data.location.coordinates[0],
        zoom: 12,
      });
    });
  }, []);

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
          <CardHeader title="Informations" subheader={`d??charge cr????e le: ${formatDate(dump.created_at)}`} />
          <CardContent>
            <Typography sx={{
              display: 'flex', flexDirection: 'row', fontSize: '12px', color: '#7D7D7D',
            }}
            >
              Statut:
              <Typography sx={{ fontSize: '12px', marginLeft: '5px' }}>
                {dump.status === 'open' ? 'Ouverte' : 'En attente'}
              </Typography>
            </Typography>
            <Map
              mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              initialViewState={viewport}
              mapStyle="mapbox://styles/mapbox/light-v9"
              style={{ minWidth: '50vw', height: '50vh' }}
            >
              <GeolocateControl
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation
              />
              <Marker
                longitude={dump.location.coordinates[0]}
                latitude={dump.location.coordinates[1]}
                anchor="top"
              >
                <PlaceIcon
                  sx={{
                    fontSize: '30px',
                  }}
                  color="primary"
                />
              </Marker>
            </Map>
            <Divider variant="middle" />
            <Box sx={styles.infos}>
              <div css={styles.dumpInfos}>
                <div css={styles.section}>
                  <Typography variant="subtitle2" sx={styles.title}>Description:</Typography>
                  <Typography variant="body2" sx={styles.text}>{dump.comment}</Typography>
                </div>
                <div css={styles.section}>
                  <Typography variant="subtitle2" sx={styles.title}>D??charge accessible:</Typography>
                  {dump.accessible.onCar && <Typography variant="body2" sx={styles.text}>En voiture</Typography>}
                  {dump.accessible.onFoot && <Typography variant="body2" sx={styles.text}>A pied</Typography>}
                </div>
                <div css={styles.section}>
                  <Typography variant="subtitle2" sx={styles.title}>Equipements n??cessaires au nettoyage: </Typography>
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
              <Gallery pictures={dump.pictures} height="auto" width="450px" />
            </Box>
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
                Nettoyer la d??charge
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
            <Tooltip title="signaler la d??charge" placement="top-end">
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
