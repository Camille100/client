/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import Map, { GeolocateControl, Marker } from 'react-map-gl';
import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PlaceIcon from '@mui/icons-material/Place';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LngLat } from 'mapbox-gl';
import { useSelector } from 'react-redux';

import DumpForm from './components/DumpForm';

const Home = () => {
  const [openDumpForm, setOpenDumpForm] = useState(false);
  const [openEventForm, setOpenEventForm] = useState(false);
  const [viewport, setViewport] = useState({});
  const [coordinates, setCoordinates] = useState({
    longitude: undefined,
    latitude: undefined,
  });
  const user = useSelector((state) => state.user);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        zoom: 12,
      });
    });
  }, []);

  const handleMarker = (e) => {
    console.log(e);
    setCoordinates({
      longitude: e.lngLat.lng,
      latitude: e.lngLat.lat,
    });
  };

  const handleDeleteMarker = () => {
    setCoordinates({
      longitude: undefined,
      latitude: undefined,
    });
  };

  const handleDump = () => {
    setOpenDumpForm(true);
  };

  return (
    <div
      style={{
        width: '100vw', height: '91vh', margin: 0, padding: 0, overflow: 'hidden',
      }}
    >
      {viewport.latitude && viewport.longitude && (
        <div>
          <Map
            mapboxAccessToken="pk.eyJ1IjoiY2FtaWxsZS1nZXJhcmQiLCJhIjoiY2xhY2U4NDYyMDk5MzNvczQyYjFnbHpxYSJ9.gE3NI2Pym2aYOUq6psRGyA"
            initialViewState={viewport}
            mapStyle="mapbox://styles/mapbox/light-v9"
            style={{ width: '100vw', height: '100vh' }}
            onClick={handleMarker}
            onContextMenu={handleDeleteMarker}
          >
            <GeolocateControl
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation
            />
            {coordinates.longitude !== undefined && coordinates.latitude !== undefined
            && (
            <Marker longitude={coordinates.longitude} latitude={coordinates.latitude} anchor="bottom">
              <PlaceIcon
                sx={{
                  fontSize: '30px',
                }}
                color="primary"
              />
            </Marker>
            )}
          </Map>
          <SpeedDial
            ariaLabel="SpeedDial playground example"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
            direction="up"
          >
            <SpeedDialAction
              key="dump"
              icon={<AddLocationIcon />}
              tooltipTitle="Ajouter une décharge"
              disabled={!user.loggedIn}
              onClick={handleDump}
            />
            <SpeedDialAction
              key="event"
              icon={<EventAvailableIcon />}
              tooltipTitle="Ajouter un évènement"
            />
          </SpeedDial>
          <DumpForm open={openDumpForm} setOpen={setOpenDumpForm} coordinates={coordinates} />
        </div>
      )}
    </div>
  );
};

export default Home;
