/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { PickerInline } from 'filestack-react-18';
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
import { useDispatch, useSelector } from 'react-redux';
import { getEquipments } from '../../../services/equipmentServices';
import { addDump } from '../../../services/dumpServices';
import { openToast } from '../../../redux/slices/toastSlice';

const DumpForm = ({ open, setOpen, coordinates }) => {
  const [allEquipments, setAllEquipments] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);
  const [comment, setComment] = useState('');
  const [checked, setChecked] = useState({
    onFoot: false,
    onCar: false,
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const myRef = useRef(null);
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

  const handleClose = () => {
    setOpen(false);
  };

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

  const handleAddDump = () => {
    if (coordinates.latitude === undefined || coordinates.longitude === undefined) {
      dispatch(openToast({ message: 'Veuillez choisir un point sur la carte', severity: 'error' }));
      handleClose();
      return;
    }
    const dumpObj = {
      creator: user.userId,
      comment,
      coordinates,
      equipment: equipmentList,
      accessible: checked,
      pictures: uploadedFiles,
    };
    addDump(dumpObj).then((res) => {
      if (res.status === 201) {
        handleClose();
        return dispatch(openToast({ message: 'Décharge ajoutée avec succès', severity: 'success' }));
      }
      handleClose();
      return dispatch(openToast({ message: 'Erreur lors de l&apos;ajout de la décharge', severity: 'error' }));
    });
  };

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
                value={comment}
                onChange={handleComment}
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
              <PickerInline
                apikey={process.env.REACT_APP_FILE_STACK_KEY}
                pickerOptions={{
                  fromSources: ['local_file_system'],
                  maxFiles: 5,
                  accept: 'image/*',
                  customText: {
                    'File {displayName} is not an accepted file type. The accepted file types are {types}': 'File {displayName} is not an accepted file type. The accepted file types are .jpeg, .jpg, .png',
                  },
                }}
                onUploadDone={(res) => {
                  const uploadedFilesArr = [];
                  res.filesUploaded.forEach((file) => {
                    uploadedFilesArr.push(file.url);
                  });
                  setUploadedFiles([...uploadedFiles, ...uploadedFilesArr]);
                }}
              >
                <div
                  style={{
                    marginTop: '20px',
                    height: '30px',
                    width: '100%',
                    zIndex: '0',
                  }}
                />
              </PickerInline>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Fermer</Button>
              <Button onClick={handleAddDump}>Enregistrer</Button>
            </DialogActions>
          </>
        )
        : <CircularProgress />}
    </Dialog>
  );
};

export default DumpForm;
