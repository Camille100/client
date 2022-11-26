/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { PickerInline } from 'filestack-react-18';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { addDumpCleaner } from '../../../services/dumpServices';
import { openToast } from '../../../redux/slices/toastSlice';

const CleaningForm = ({ open, setOpen, dumpId }) => {
  const [pictures, setPictures] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleCleaning = () => {
    if (!user.userId || pictures.length === 0 || pictures.length === 0) {
      dispatch(openToast({ message: 'Informations manquantes', severity: 'error' }));
      return;
    }
    const body = {
      dumpId,
      cleaningDemand: {
        cleaner: user.userId,
        status: 'waiting',
        pictures,
      },
    };
    addDumpCleaner(body).then((res) => {
      if (res.status === 200) {
        dispatch(openToast({ message: 'Demande de nettoyage envoyée', severity: 'success' }));
        handleClose();
        return;
      }
      dispatch(openToast({ message: 'Echec de la demande de nettoyage', severity: 'error' }));
      handleClose();
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ width: '100%' }}>
      <DialogTitle>Nettoyage d&apos;une décharge</DialogTitle>
      <DialogContent sx={{ minHeight: '450px', width: '100%' }}>
        <DialogContentText sx={{ marginTop: '15px', marginBottom: '10px' }}>
          Veuillez sélectionner les photos de la décharge nettoyée:
        </DialogContentText>
        <PickerInline
          apikey={process.env.REACT_APP_FILE_STACK_KEY}
          pickerOptions={{
            fromSources: ['local_file_system'],
            maxFiles: 5,
            accept: 'image/*',
            imageDim: [800, null],
            customText: {
              'File {displayName} is not an accepted file type. The accepted file types are {types}': 'File {displayName} is not an accepted file type. The accepted file types are .jpeg, .jpg, .png',
            },
          }}
          onUploadDone={(res) => {
            const uploadedFilesArr = [];
            res.filesUploaded.forEach((file) => {
              uploadedFilesArr.push(file.url);
            });
            setPictures([...pictures, ...uploadedFilesArr]);
          }}
        >
          <div
            style={{
              marginTop: '20px',
              height: '30px',
              width: '100%',
              minWidth: '420px',
              zIndex: '0',
            }}
          />
        </PickerInline>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Fermer</Button>
        <Button onClick={handleCleaning}>Envoyer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CleaningForm;
