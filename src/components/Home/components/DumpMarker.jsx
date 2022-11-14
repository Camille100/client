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
  Box,
} from '@mui/material';
import { css, jsx } from '@emotion/react';
import { Marker } from 'react-map-gl';
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

const DumpMarker = ({ dump }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  // console.log(dump);
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
          <Box sx={{
            display: 'flex', flexDirection: 'row', maxWidth: '500px',
          }}
          >
            <CardMedia
              component="img"
              sx={{ objectFit: 'cover', width: '50%' }}
              image={dump.pictures[0]}
              alt="dump picture"
            />
            <CardContent sx={{ height: '100%', width: '50%' }}>
              <div>
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
              <Button
                color="primary"
                variant="contained"
                size="small"
                component={Link}
                to={`/dump/${dump._id}`}
                sx={{ marginTop: '15px' }}
              >
                Voir détail
              </Button>
            </CardContent>
          </Box>
        </Card>
      </Popover>
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
          onMouseEnter={handleOpen}
        />
      </Marker>
    </div>
  );
};

export default DumpMarker;
