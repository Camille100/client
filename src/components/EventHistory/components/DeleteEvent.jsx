/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteEvent } from '../../../services/eventServices';
import { openToast } from '../../../redux/slices/toastSlice';

const DeleteEvent = ({ open, setOpen, eventId }) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    // deleteEvent(eventId).then((res) => {
    //   if (res.status === 200) {
    //     dispatch(openToast({ message: 'Décharge supprimée' }));
    //   } else {
    //     dispatch(openToast({ message: 'Erreur lors de la suppression' }));
    //   }
    //   handleClose();
    // });
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogContent>
        Etes-vous sûr(e) de vouloir supprimer cet évènement ?
      </DialogContent>
      <DialogActions>
        <Button disableElevation color="paleGreen" variant="contained" onClick={handleDelete}>Confirmer</Button>
        <Button disableElevation variant="contained" onClick={handleClose}>Annuler</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteEvent;
