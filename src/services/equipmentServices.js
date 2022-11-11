import instance from './axios';

export const getEquipments = () => instance.get('/equipment/equipments')
  .then((response) => response)
  .catch((error) => error);

export const addEquipment = (body) => instance.post('/equipment/add', body)
  .then((response) => response)
  .catch((error) => error);
