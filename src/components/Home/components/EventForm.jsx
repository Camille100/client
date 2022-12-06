/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Select from 'react-select';
import circle from '@turf/circle';
import { useSelector, useDispatch } from 'react-redux';
import { getEquipments } from '../../../services/equipmentServices';
import { addEvent } from '../../../services/eventServices';
import { openToast } from '../../../redux/slices/toastSlice';

const EventForm = ({
  coordinates, open, setOpen, event,
}) => {
  const [allEquipments, setAllEquipments] = useState([]);
  const [equipmentList, setEquipmentList] = useState([...event.equipments]);
  const [beginDate, setBeginDate] = useState(event.beginDate);
  const [endDate, setEndDate] = useState(event.endDate);
  const [comment, setComment] = useState(event.comment);
  const [checked, setChecked] = useState(event.accessible);
  const [status, setStatus] = useState(event.status);
  const [radius, setRadius] = useState(event.radius || 0);
  const [polygon, setPolygon] = useState({});
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.loggedIn) {
      getEquipments().then((res) => {
        if (res.status === 200) {
          const formattedData = [];
          res.data.forEach((equipment) => {
            formattedData.push({
              id: equipment._id,
              label: equipment.name,
              value: equipment.name,
            });
          });
          setAllEquipments(formattedData);
          if (event.equipments.length > 0) {
            const equipments = [];
            event.equipments.forEach((equipment) => {
              equipments.push({
                id: equipment._id,
                label: equipment.name,
                value: equipment.name,
              });
            });
            setEquipmentList(equipments);
          }
        } else {
          dispatch(openToast({ message: 'Récupération des équipements échouée', severity: 'error' }));
        }
      });
    }
  }, []);

  const handleSelect = (e) => {
    setEquipmentList(e);
  };

  const handleComment = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const handleCheckbox = (value) => {
    if (value === 'onFoot') {
      setChecked({
        ...checked,
        onFoot: !checked.onFoot,
      });
    } else if (value === 'onCar') {
      setChecked({
        ...checked,
        onCar: !checked.onCar,
      });
    }
  };

  const handleRadius = (e) => {
    const options = { steps: 50, units: 'kilometers', properties: { foo: 'bar' } };
    const { longitude } = coordinates;
    const { latitude } = coordinates;
    const center = [longitude, latitude];
    setPolygon(circle(center, radius, options).geometry);
    setRadius(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleAddEvent = () => {
    if (radius === 0 || Object.values(coordinates).length === 0) {
      dispatch(openToast({ message: 'Veuillez sélectionner un point sur la carte et un rayon', severity: 'error' }));
      return;
    }
    if (!user.userId || !comment) {
      dispatch(openToast({ message: 'Veuillez compléter tous les champs', severity: 'error' }));
      return;
    }
    const eventObj = {
      creator: user.userId,
      comment,
      status,
      beginDate: new Date(beginDate),
      endDate: new Date(endDate),
      location: polygon,
      center: [coordinates.longitude, coordinates.latitude],
      equipment: equipmentList,
      accessible: checked,
    };
    addEvent(eventObj).then((res) => {
      console.log(res);
      if (res.status === 201) {
        dispatch(openToast({ message: 'Evènement enregistré avec succès', severity: 'success' }));
        handleClose();
      } else {
        dispatch(openToast({ message: 'Echec de l\'enregistrement de l\'évènement', severity: 'error' }));
        handleClose();
      }
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Création d&apos;un évènement</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Veuillez ajouter une description de l&apos;évènement:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          variant="outlined"
          value={comment}
          onChange={handleComment}
          sx={{ marginBottom: '30px' }}
        />
        <DialogContentText sx={{ marginBottom: '20px' }}>
          Veuillez choisir un périmètre d&apos;action:
        </DialogContentText>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Date et heure de début"
              value={beginDate}
              onChange={(newValue) => {
                setBeginDate(newValue);
              }}
            />
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Date et heure de fin"
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
            />
          </Stack>
        </LocalizationProvider>
        <DialogContentText sx={{ marginTop: '20px' }}>
          Veuillez choisir un périmètre d&apos;action:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="radius"
          label="Radius"
          type="number"
          fullWidth
          variant="outlined"
          value={radius}
          onChange={handleRadius}
          sx={{ marginBottom: '10px' }}
        />
        <DialogContentText sx={{ marginTop: '15px', marginBottom: '10px' }}>
          Cet évènement est accessible:
        </DialogContentText>
        <FormGroup>
          <FormControlLabel control={<Checkbox value="onCar" checked={checked.onCar} onChange={() => handleCheckbox('onCar')} />} label="En voiture" />
          <FormControlLabel control={<Checkbox value="onFoot" checked={checked.onFoot} onChange={() => handleCheckbox('onFoot')} />} label="A pieds" />
        </FormGroup>
        <DialogContentText sx={{ marginTop: '15px', marginBottom: '10px' }}>
          Vous voulez rendre cet évènement:
        </DialogContentText>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          value={status}
          onChange={handleStatus}
        >
          <FormControlLabel value="public" control={<Radio />} label="Public" />
          <FormControlLabel value="private" control={<Radio />} label="Privé" />
        </RadioGroup>
        <DialogContentText sx={{ marginTop: '15px', marginBottom: '10px' }}>
          Informez les autres utilisateurs du matériel qu&apos;ils peuvent amener:
        </DialogContentText>
        <Select
          isMulti
          name="equipments"
          options={allEquipments}
          value={equipmentList}
          onChange={handleSelect}
          className="basic-multi-select"
          classNamePrefix="select"
          menuPortalTarget={document.body}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Fermer</Button>
        <Button onClick={handleAddEvent}>Enregistrer</Button>
      </DialogActions>
    </Dialog>
  );
};

EventForm.defaultProps = {
  event: {
    equipments: [],
    beginDate: new Date(),
    endDate: new Date(),
    comment: '',
    accessible: {
      onFoot: false,
      onCar: false,
    },
    status: 'public',
  },
};

EventForm.propTypes = {
  event: PropTypes.object,
};

export default EventForm;
