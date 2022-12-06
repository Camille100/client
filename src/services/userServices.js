import instance from './axios';

export const getUsers = () => instance.get('/user/users')
  .then((response) => response)
  .catch((error) => error);

export const getUser = (body) => instance.post('/user/user', body)
  .then((response) => response)
  .catch((error) => error);

export const searchUser = (body) => instance.post('/user/search', body)
  .then((response) => response)
  .catch((error) => error);

export const updateUser = (userId, body) => instance.put(`/user/update/${userId}`, body)
  .then((response) => response)
  .catch((error) => error);

export const deleteUser = (userId) => instance.delete(`/user/delete/${userId}`)
  .then((response) => response)
  .catch((error) => error);
