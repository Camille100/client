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
import { Source, Layer } from 'react-map-gl';
import PlaceIcon from '@mui/icons-material/Place';

const styles = {
  card: css`
    display: flex;
    flex-direction: column;
  `,
  title: css`
    margin-bottom: 5px;
  `,
  text: css`
    margin-bottom: 5px;
    margin-left: 5px;
  `,
  section: css`
    margin-bottom: 15px;
  `,
};

const EventMarker = ({ event }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  // console.log(event);
  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  return (
    <div>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
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
          onMouseLeave={handleClose}
          sx={styles.card}
        >
          <CardContent sx={{ height: '100%', width: '100%' }}>
            <div>
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
      <Source id="my-data" type="geojson" data={event.location}>
        <Layer
          id="point-90-hi"
          type="fill"
          paint={{
            'fill-color': '#088',
            'fill-opacity': 0.4,
            'fill-outline-color': 'yellow',
          }}
        />
      </Source>
    </div>
  );
};

export default EventMarker;
