/* eslint-disable no-param-reassign */
import axios from 'axios';
import { refreshToken } from './authServices';

const instance = axios.create();

if (localStorage.getItem('auth')) {
  const auth = JSON.parse(localStorage.getItem('auth'));
  instance.defaults.headers.common.Authorization = `Bearer ${auth.accessToken}`;
}

instance.defaults.baseURL = 'http://localhost:5000';
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers.withCredentials = true;

instance.interceptors.request.use(
  (config) => refreshToken().then((res) => {
    if (res.status === 200) {
      localStorage.setItem('auth', JSON.stringify(res.data.accessToken));
      config.headers.Authorization = `Bearer ${res.data.accessToken}`;
    }
    return config;
  }),
  (error) => Promise.reject(error),
);

export default instance;
