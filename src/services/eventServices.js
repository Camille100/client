import instance from './axios';

export const getEvents = () => instance.get('/event/events')
  .then((response) => response)
  .catch((error) => error);

export const getEvent = (eventId) => instance.get(`/event/${eventId}`)
  .then((response) => response)
  .catch((error) => error);

export const getEventsByUser = (userId) => instance.get(`/event/events/${userId}`)
  .then((response) => response)
  .catch((error) => error);

export const subscribeEvent = (eventId, body) => instance.put(`/event/subscribe/${eventId}`, body)
  .then((response) => response)
  .catch((error) => error);

export const confirmAttendance = (eventId, body) => instance.put(`/event/attendance/${eventId}`, body)
  .then((response) => response)
  .catch((error) => error);

export const updateEvent = (eventId, body) => instance.get(`/event/update/${eventId}`, body)
  .then((response) => response)
  .catch((error) => error);

export const deleteEvent = (eventId) => instance.get(`/event/delete/${eventId}`)
  .then((response) => response)
  .catch((error) => error);

export const addEvent = (body) => instance.post('/event/add', body)
  .then((response) => response)
  .catch((error) => error);
