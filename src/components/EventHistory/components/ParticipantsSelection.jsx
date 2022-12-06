/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Autocomplete,
  Dialog,
  TextField,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../../services/userServices';
import { addInvite } from '../../../services/inviteServices';
import { openToast } from '../../../redux/slices/toastSlice';

const ParticipantsSelection = ({ event, open, setOpen }) => {
  const [users, setUsers] = useState([]);
  const [participants, setParticipants] = useState([...event.participants]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const debounce = (func, timeout = 500) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  };

  const saveInput = (e, value) => {
    searchUser({ search: e.target.value }).then((res) => {
      if (res.status === 200) {
        setUsers(res.data);
      }
    });
  };

  const handleChange = (e, value) => {
    setParticipants(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendInvite = () => {
    participants.forEach((participant) => {
      addInvite({
        status: 'waiting',
        idSender: user.userId,
        idReceiver: participant.id,
        idEvent: event._id,
      }).then((res) => {
        if (res.status !== 200) {
          dispatch(openToast({ message: 'Problème dans l\'envoi des invitations', severity: 'error' }));
        }
      });
    });
    dispatch(openToast({ message: 'Invitations envoyées', severity: 'success' }));
    handleClose();
  };

  const handleSearch = debounce((e, value) => saveInput(e, value));
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogContent sx={{ minWidth: '370px' }}>
        <Autocomplete
          multiple
          id="tags-participants"
          options={users}
          onChange={handleChange}
          getOptionLabel={(option) => option.email}
          getOptionValue={(option) => option.id}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              onChange={(e, value) => handleSearch(e)}
              label="Participants"
              placeholder="Participants"
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Fermer</Button>
        <Button onClick={handleSendInvite}>Enregistrer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ParticipantsSelection;
