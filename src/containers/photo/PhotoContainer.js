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
                console.log(response);
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

    useEffect(() => {
        if(user)
            dispatch(getPhotoList(user.email));
    }, [user, dispatch])


    return(
        <Photo user={user} photoList={photoList} uploadPhoto={uploadPhoto} dragDrop={dragDrop} />
    );
};

export default PhotoContainer;