import client from './client';

export const uploadPhoto = (formData) => client.post('/photo/upload/photos', formData);

export const getPhotoList = (userEmail) => client.get(`/photo/list/${userEmail}`);

export const downloadPhoto = (photo_id) => client.get(`/photo/download/${photo_id}`);

export const deletePhoto = (photo_id) => client.delete(`/photo/delete/${photo_id}`);