/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
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

const EventForm = ({ coordinates, open, setOpen }) => {
  const [allEquipments, setAllEquipments] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);
  const [beginDate, setBeginDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [comment, setComment] = useState('');
  const [checked, setChecked] = useState({
    onFoot: false,
    onCar: false,
  });
  const [status, setStatus] = useState('public');
  const [radius, setRadius] = useState(0);
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
    console.log(polygon);
    const eventObj = {
      creator: user.userId,
      comment,
      status,
      beginDate: new Date(beginDate),
      endDate: new Date(endDate),
      location: polygon,
      equipment: equipmentList,
      accessible: checked,
    };
    console.log(eventObj);
    addEvent(eventObj).then((res) => console.log(res));
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

export default EventForm;
