import instance from './axios';

export const getEquipments = () => instance.get('/equipment/equipments')
  .then((response) => response)
  .catch((error) => error);

export const getEquipment = (equipmentId) => instance.get(`/equipment/${equipmentId}`)
  .then((response) => response)
  .catch((error) => error);

export const addEquipment = (body) => instance.post('/equipment/add', body)
  .then((response) => response)
  .catch((error) => error);

export const updateEquipment = (equipmentId, body) => instance.put(`/equipment/update/${equipmentId}`, body)
  .then((response) => response)
  .catch((error) => error);

export const deleteEquipment = (equipmentId) => instance.delete(`/equipment/delete/${equipmentId}`)
  .then((response) => response)
  .catch((error) => error);
