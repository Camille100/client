/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Popover,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from '@mui/material';
import { css, jsx } from '@emotion/react';
import { Source, Layer, Marker } from 'react-map-gl';
import PlaceIcon from '@mui/icons-material/Place';
import { truncateString } from '../../../utils/utils';

const styles = {
  card: css`
    display: flex;
    flex-direction: column;
  `,
  title: css`
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 5px;
    color: #5c5c5c;
  `,
  text: css`
    font-size: 12px;
    margin-bottom: 5px;
    color: #6d6d6d;
    text-align: justify;
  `,
  section: css`
    margin-bottom: 15px;
  `,
};

const EventMarker = ({ event, index }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenPopover = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenPopover(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
    setOpenPopover(false);
  };

  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: event.location.type,
          coordinates: event.location.coordinates,
        },
      },
    ],
  };
  return (
    <div>
      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        onClose={() => {
          handleClose();
          handleClosePopover();
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Card
          onMouseLeave={() => {
            handleClose();
            handleClosePopover();
          }}
          sx={styles.card}
        >
          <CardContent sx={{ height: '100%', width: '100%', maxWidth: '300px' }}>
            <div>
              <div css={styles.section}>
                <Typography variant="subtitle2" sx={styles.title}>Description:</Typography>
                <Typography variant="body2" sx={styles.text}>{truncateString(event.comment, 150)}</Typography>
              </div>
              <div css={styles.section}>
                <Typography variant="subtitle2" sx={styles.title}>Evènement accessible:</Typography>
                {event.accessible.onCar && <Typography variant="body2" sx={styles.text}>En voiture</Typography>}
                {event.accessible.onFoot && <Typography variant="body2" sx={styles.text}>A pied</Typography>}
              </div>
              <div css={styles.section}>
                <Typography variant="subtitle2" sx={styles.title}>Equipements nécessaires au nettoyage: </Typography>
                {event.equipments.map((equipment, equipmentIndex) => (
                  <Typography
                    variant="body2"
                    key={`equipment-${equipmentIndex + 1}`}
                    sx={styles.text}
                  >
                    {equipment.name}
                  </Typography>
                ))}
              </div>
            </div>
            <Button
              color="primary"
              variant="contained"
              size="small"
              component={Link}
              to={`/event/${event._id}`}
              sx={{ marginTop: '15px' }}
            >
              Voir détail
            </Button>
          </CardContent>
        </Card>
      </Popover>
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
          onMouseEnter={(e) => {
            handleOpenPopover(e);
            handleOpen();
          }}
          // onMouseLeave={handleClose}
        />
      </Marker>
      {open
      && (
      <Source id={`source-${index + 1}`} type="geojson" data={geojson}>
        <Layer
          id={`layer-${index + 1}`}
          type="fill"
          paint={{
            'fill-color': '#848484',
            'fill-opacity': 0.4,
            'fill-outline-color': '#81B19B',
          }}
        />
      </Source>
      )}
    </div>
  );
};

export default EventMarker;
