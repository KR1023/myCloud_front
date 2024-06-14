import client from './client';

export const uploadPhoto = (formData) => client.post('/photo/upload/photos', formData);

export const getPhotoList = (userEmail) => client.get(`/photo/list/${userEmail}`);