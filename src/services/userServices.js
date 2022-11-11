import instance from './axios';

export const getUsers = () => instance.get('/user/users')
  .then((response) => response)
  .catch((error) => error);

export const getUser = (body) => instance.post('/user/user', body)
  .then((response) => response)
  .catch((error) => error);
