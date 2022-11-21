import instance from './axios';

export const getNotifications = () => instance.get('/notification/notifications')
  .then((response) => response)
  .catch((error) => error);

export const getNotification = (notificationId) => instance.get(`/notification/${notificationId}`)
  .then((response) => response)
  .catch((error) => error);

export const addNotification = (body) => instance.post('/notification/add', body)
  .then((response) => response)
  .catch((error) => error);

export const updateNotification = (notificationId, body) => instance.put(`/notification/update/${notificationId}`, body)
  .then((response) => response)
  .catch((error) => error);

export const deleteNotification = (notificationId) => instance.delete(`/notification/delete/${notificationId}`)
  .then((response) => response)
  .catch((error) => error);
