/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Map, {
  GeolocateControl, Source, Layer, Marker,
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
} from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import HelpIcon from '@mui/icons-material/Help';
import { css, jsx } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent, subscribeEvent } from '../../services/eventServices';
import { formatDate } from '../../utils/utils';
import { openToast } from '../../redux/slices/toastSlice';

const styles = {
  dumpInfos: css`
   margin-top: 30px;
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
    margin-left: 10px;
  `,
  button: css`
    margin-bottom: 15px;
  `,
};

const Event = () => {
  const params = useParams();
  const [event, setEvent] = useState({});
  const [viewport, setViewport] = useState({});
  const [geojson, setGeojson] = useState({});
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getEvent(params.eventId).then((res) => {
      setEvent(res.data);
      setViewport({
        ...viewport,
        latitude: res.data.center[1],
        longitude: res.data.center[0],
        zoom: 12,
      });
      setGeojson({
        type: 'FeatureCollection',
        features: [
          { type: 'Feature', geometry: { type: res.data.location.type, coordinates: res.data.location.coordinates } },
        ],
      });
    });
  }, []);

  const handleInscription = () => {
    subscribeEvent(event._id, { userId: user.userId }).then((res) => {
      if (res.status === 200) {
        dispatch(openToast({ message: 'Inscription réussie', severity: 'success' }));
      } else {
        dispatch(openToast({ message: 'Inscription échouée', severity: 'error' }));
      }
    });
  };

  if (event && event.accessible && geojson) {
    return (
      <Card sx={{ minWidth: 275, marginTop: '30px', marginBottom: '40px' }}>
        <CardHeader title="Informations" subheader={`évènement créé le: ${formatDate(event.created_at)}`} />
        <CardContent>
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
              longitude={event.center[0]}
              latitude={event.center[1]}
              anchor="top"
            >
              <PlaceIcon
                sx={{
                  fontSize: '30px',
                }}
                color="secondary"
              />
            </Marker>
            <Source type="geojson" data={geojson}>
              <Layer
                type="fill"
                paint={{
                  'fill-color': '#848484',
                  'fill-opacity': 0.4,
                  'fill-outline-color': '#81B19B',
                }}
              />
            </Source>
          </Map>
          <Divider variant="middle" />
          <div css={styles.dumpInfos}>
            <div css={styles.section}>
              <Typography variant="subtitle2" sx={styles.title}>Description:</Typography>
              <Typography variant="body2" sx={styles.text}>{event.comment}</Typography>
            </div>
            <div css={styles.section}>
              <Typography variant="subtitle2" sx={styles.title}>Evènement accessible:</Typography>
              {event.accessible.onCar && <Typography variant="body2" sx={styles.text}>En voiture</Typography>}
              {event.accessible.onFoot && <Typography variant="body2" sx={styles.text}>A pied</Typography>}
            </div>
            <div css={styles.section}>
              <Typography variant="subtitle2" sx={styles.title}>Equipements nécessaires au nettoyage: </Typography>
              {event.equipments.map((equipment, index) => (
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
          <Button size="medium" variant="contained" sx={styles.button} onClick={handleInscription}>S&apos;inscrire</Button>
          <Tooltip title="signaler l'évènement" placement="top-end">
            <IconButton size="small" variant="contained" sx={styles.button}>
              <HelpIcon color="neutral" />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    );
  }
  return (<CircularProgress />);
};

export default Event;
