import client from './client';

export const uploadPhoto = (formData) => client.post('/photo/upload/photos', formData);

export const getPhotoList = ({userEmail, startDate, endDate}) => 
    {
        if(startDate && endDate){
            return client.get(`/photo/list/${userEmail}?startDate=${startDate}&endDate=${endDate}`);
        }else{
            return client.get(`/photo/list/${userEmail}`)
        }
    };

// export const downloadPhoto = (photo_id) => client.get(`/photo/download/${photo_id}`);

// export const downloadPhotos = (photoIdArr) => client.post('/photo/download/photos', photoIdArr);

export const deletePhoto = (photo_id) => client.delete(`/photo/delete/${photo_id}`);

export const deletePhotos = (idList) => client.post('/photo/delete-photos', idList);
