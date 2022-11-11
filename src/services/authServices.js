import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

export const register = (body) => axios.post('/auth/register', body, { withCredentials: true })
  .then((response) => response.status)
  .catch((error) => error.response.data);

export const login = (body) => axios.post('/auth/login', body, { withCredentials: true })
  .then((response) => response)
  .catch((error) => error);

export const logout = () => axios.get('/auth/logout', { withCredentials: true })
  .then((response) => response)
  .catch((error) => error);

export const refreshToken = () => axios.get('/auth/token', { withCredentials: true })
  .then((response) => response)
  .catch((error) => error);
