/* eslint-disable max-len */
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
  Grid,
} from '@mui/material';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { getEquipments } from '../../../services/equipmentServices';
import { addDump } from '../../../services/dumpServices';
import { openToast } from '../../../redux/slices/toastSlice';
import { addXp } from '../../../redux/slices/userSlice';

const UpdateDump = ({
  open, setOpen, coordinates, dump,
}) => {
  const [allEquipments, setAllEquipments] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);
  const [comment, setComment] = useState(dump.comment);
  const [checked, setChecked] = useState(dump.accessible);
  const [uploadedFiles, setUploadedFiles] = useState(dump.pictures);
  const myRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.loggedIn && dump !== undefined) {
      getEquipments().then((res) => {
        if (res.status === 200) {
          const formattedData = [];
          const equipments = [];
          res.data.forEach((equipment) => {
            formattedData.push({
              id: equipment._id,
              label: equipment.name,
              value: equipment.name,
            });
            dump.equipments.forEach((equipmentId) => {
              if (equipmentId.toString() === equipment._id.toString()) {
                equipments.push({
                  id: equipment._id,
                  label: equipment.name,
                  value: equipment.name,
                });
              }
            });
          });
          setEquipmentList(equipments);
          setAllEquipments(formattedData);
        }
      });
    }
  }, []);

  const handleClose = () => {
    setUploadedFiles([]);
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
      coordinates: dump.coordinates,
      equipment: equipmentList,
      accessible: checked,
      pictures: uploadedFiles,
    };
    addDump(dumpObj).then((res) => {
      if (res.status === 201) {
        handleClose();
        dispatch(addXp(50));
        return dispatch(openToast({ message: 'D??charge ajout??e avec succ??s', severity: 'success' }));
      }
      handleClose();
      return dispatch(openToast({ message: 'Erreur lors de l\'ajout de la d??charge', severity: 'error' }));
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      {allEquipments.length > 0
        ? (
          <>
            <DialogTitle>Modification de la d??charge</DialogTitle>
            <DialogContent ref={myRef}>
              <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={4} sm={8} md={12}>
                  <DialogContentText>
                    Veuillez ajouter une description de la d??charge:
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
                </Grid>
                <Grid item xs={4} sm={8} md={12}>
                  <DialogContentText sx={{ marginTop: '15px', marginBottom: '10px' }}>
                    Cette d??charge est accessible:
                  </DialogContentText>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox value="onCar" checked={checked.onCar} onChange={() => handleCheckbox('onCar')} />} label="En voiture" />
                    <FormControlLabel control={<Checkbox value="onFoot" checked={checked.onFoot} onChange={() => handleCheckbox('onFoot')} />} label="A pieds" />
                  </FormGroup>
                </Grid>
                <Grid item xs={4} sm={8} md={12}>
                  <DialogContentText sx={{ marginTop: '15px', marginBottom: '10px' }}>
                    Informez les autres utilisateurs du mat??riel n??cessaire au nettoyage de la d??charge:
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
                </Grid>
                <Grid item xs={4} sm={8} md={12}>
                  <PickerInline
                    apikey={process.env.REACT_APP_FILE_STACK_KEY}
                    pickerOptions={{
                      fromSources: ['local_file_system'],
                      maxFiles: 5,
                      accept: 'image/*',
                      imageDim: [800, null],
                      customText: {
                        'File {displayName} is not an accepted file type. The accepted file types are {types}': 'Les fichiers {displayName} ne sont pas accept??s. Les extensions accept??e sont: .jpeg, .jpg, .png',
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
                </Grid>
              </Grid>
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

export default UpdateDump;
