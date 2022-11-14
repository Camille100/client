import instance from './axios';

export const getEvents = () => instance.get('/event/events')
  .then((response) => response)
  .catch((error) => error);

export const addEvent = (body) => instance.post('/event/add', body)
  .then((response) => response)
  .catch((error) => error);
