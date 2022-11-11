/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from '@mui/material';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { getEquipments } from '../../../services/equipmentServices';
import { openToast } from '../../../redux/slices/toastSlice';

const DumpForm = ({ open, setOpen }) => {
  const [allEquipments, setAllEquipments] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);
  const [checked, setChecked] = useState({
    onFoot: false,
    onCar: false,
  });
  const myRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
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
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = (e) => {
    setEquipmentList(e);
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

  console.log(checked);

  return (
    <Dialog open={open} onClose={handleClose}>
      {allEquipments.length > 0
        ? (
          <>
            <DialogTitle>Enregistrement d&apos;une décharge</DialogTitle>
            <DialogContent ref={myRef}>
              <DialogContentText>
                Veuillez ajouter une description de la décharge:
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Description"
                type="text"
                fullWidth
                variant="outlined"
              />
              <DialogContentText sx={{ marginTop: '15px', marginBottom: '10px' }}>
                Cette décharge est accessible:
              </DialogContentText>
              <FormGroup>
                <FormControlLabel control={<Checkbox value="onCar" checked={checked.onCar} onChange={() => handleCheckbox('onCar')} />} label="En voiture" />
                <FormControlLabel control={<Checkbox value="onFoot" checked={checked.onFoot} onChange={() => handleCheckbox('onFoot')} />} label="A pieds" />
              </FormGroup>
              <DialogContentText sx={{ marginTop: '15px', marginBottom: '10px' }}>
                Informez les autres utilisateurs du matériel nécessaire au nettoyage de la décharge:
              </DialogContentText>
              <Select
            //   defaultValue={[colourOptions[2]]}
                isMulti
                name="colors"
                options={allEquipments}
                value={equipmentList}
                onChange={handleSelect}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Fermer</Button>
              <Button onClick={handleClose}>Enregistrer</Button>
            </DialogActions>
          </>
        )
        : <CircularProgress />}
    </Dialog>
  );
};

export default DumpForm;
