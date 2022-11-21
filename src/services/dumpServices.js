import instance from './axios';

export const getDumps = () => instance.get('/dump/dumps')
  .then((response) => response)
  .catch((error) => error);

export const addDump = (body) => instance.post('/dump/add', body)
  .then((response) => response)
  .catch((error) => error);

export const getDump = (dumpId) => instance.get(`/dump/${dumpId}`)
  .then((response) => response)
  .catch((error) => error);

export const updateDump = (dumpId, body) => instance.put(`/dump/update/${dumpId}`, body)
  .then((response) => response)
  .catch((error) => error);

export const deleteDump = (dumpId) => instance.delete(`/dump/delete/${dumpId}`)
  .then((response) => response)
  .catch((error) => error);

export const getDumpsByUser = (userId) => instance.get(`/dump/dumps/${userId}`)
  .then((response) => response)
  .catch((error) => error);

export const addDumpCleaner = (body) => instance.put('/dump/add/cleaning', body)
  .then((response) => response)
  .catch((error) => error);
