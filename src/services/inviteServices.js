import instance from './axios';

export const getInvites = () => instance.get('/invite/invites')
  .then((response) => response)
  .catch((error) => error);

export const getInvite = (inviteId) => instance.get(`/invite/${inviteId}`)
  .then((response) => response)
  .catch((error) => error);

export const addInvite = (body) => instance.post('/invite/add', body)
  .then((response) => response)
  .catch((error) => error);

export const updateInvite = (inviteId, body) => instance.put(`/invite/update/${inviteId}`, body)
  .then((response) => response)
  .catch((error) => error);

export const deleteInvite = (inviteId) => instance.delete(`/invite/delete/${inviteId}`)
  .then((response) => response)
  .catch((error) => error);
