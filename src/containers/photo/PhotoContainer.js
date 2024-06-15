import { useState } from "react";
import Photo from "../../components/photo/Photo"
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback} from 'react';
import { getPhotoList } from '../../modules/photo/photo';
import * as photoAPI from '../../lib/api/photo';

const PhotoContainer = () => {
    const dispatch = useDispatch();

    const { user, photoList } = useSelector(({user, photo}) => ({
        user: user.user,
        photoList: photo.photoList
    }));

    const [currPhoto, setCurrPhoto] = useState(null);
    const [chosenList, setChosenList] = useState([]);

    const uploadPhoto = useCallback(e => {
        const fileInput = document.createElement('input');
        fileInput.setAttribute("type", "file");
        fileInput.setAttribute("accept", ".jpg,.jpeg,.png");
        fileInput.setAttribute("multiple", true);
        fileInput.click();

        fileInput.addEventListener('change', async() => {
            const files = fileInput.files;
            
            const formData = new FormData();
            formData.append('userEmail', user.email);
            for(const file of files){
                formData.append('photo', file);
            }

            try{
                const response = await photoAPI.uploadPhoto(formData);
                dispatch(getPhotoList(user.email));
            }catch(e){
                console.error(e);
            }
        });
    }, [user, dispatch]);

    const dragDrop = useCallback(async e => {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files;
            
        const formData = new FormData();
        formData.append('userEmail', user.email);
        for(const file of files){
            formData.append('photo', file);
        }

        try{
            const response = await photoAPI.uploadPhoto(formData);
            dispatch(getPhotoList(user.email));
        }catch(e){
            console.error(e);
        }
    }, [user, dispatch]);

    const downloadAPhoto = useCallback(async currPhoto => {
        try{
            // const response = await photoAPI.downloadPhoto(currPhoto.photo_id);
            const response = await fetch(`http://localhost:4000/photo/download/${currPhoto.photo_id}`);
            const file = await response.blob();
            const downloadUrl = window.URL.createObjectURL(file);

            const a = document.createElement('a');
            document.body.appendChild(a);
            a.download = currPhoto.filename;
            a.href = downloadUrl;

            a.click();
            a.remove();
            window.URL.revokeObjectURL(downloadUrl);

        }catch(e){
            console.error(e);
        }
    }, []);

    const downloadPhotos = useCallback(async () => {
        if(!chosenList || chosenList.length === 0){
            console.log('선택된 사진 없음');
        }

        try{
            const response = await fetch(`http://localhost:4000/photo/download/photos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userEmail: user.email,
                    idList: chosenList
                })
            });

            const file = await response.blob();
            const downloadUrl = window.URL.createObjectURL(file);

            const a = document.createElement('a');
            document.body.appendChild(a);
            a.download = 'photos.zip';
            a.href = downloadUrl;

            a.click();
            a.remove();
            window.URL.revokeObjectURL(downloadUrl);
        }catch(e){
            console.error(e);
        }
    }, [user, chosenList]);

    const deleteAPhoto = async currPhoto => {
        try{
            const response = await photoAPI.deletePhoto(currPhoto.photo_id);
            if(response.data.code === 201){
                dispatch(getPhotoList(user.email));
            }
        }catch(e){
            console.error(e);
        }finally{
            setCurrPhoto(null);
        }
    }

    useEffect(() => {
        if(user)
            dispatch(getPhotoList(user.email));
    }, [user, dispatch])


    return(
        <Photo 
            user={user}
            photoList={photoList}
            currPhoto={currPhoto} 
            setCurrPhoto={setCurrPhoto} 
            chosenList={chosenList}
            setChosenList={setChosenList}
            uploadPhoto={uploadPhoto} 
            dragDrop={dragDrop} 
            downloadAPhoto={downloadAPhoto} 
            downloadPhotos={downloadPhotos}
            deleteAPhoto={deleteAPhoto}
        />
    );
};

export default PhotoContainer;