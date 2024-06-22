import { useState } from "react";
import Photo from "../../components/photo/Photo"
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback} from 'react';
import { getPhotoList } from '../../modules/photo/photo';
import * as photoAPI from '../../lib/api/photo';
import returnDateString from '../../lib/returnDateString';
import Modal from '../../components/common/Modal';

const PhotoContainer = () => {
    const dispatch = useDispatch();

    const { user, photoList } = useSelector(({user, photo}) => ({
        user: user.user,
        photoList: photo.photoList
    }));

    const [currPhoto, setCurrPhoto] = useState(null);
    const [chosenList, setChosenList] = useState([]);
    const [modalOption, setModalOption] = useState(
        {
            show: false,
            message: ''
        }
    )

    const [selectOption, setSelectOption] = useState(
        {
            selectType: 'all',
            startDate: returnDateString(new Date()),
            endDate: returnDateString(new Date())
        }
    );

    const searchImage = useCallback(() => {
        if(selectOption.selectType === 'date'){
            if((selectOption.startDate > selectOption.endDate) || !selectOption.startDate || !selectOption.endDate){
                setModalOption({message: '날짜를 확인해 주세요', show: true});
                return;
            }
            dispatch(getPhotoList({userEmail: user.email, startDate: selectOption.startDate, endDate: selectOption.endDate}));

        }else
            dispatch(getPhotoList({userEmail: user.email}));
    }, [user,selectOption, dispatch]);
    
    const onChangeRadio = useCallback(e => {
        setSelectOption({...selectOption, selectType: e.target.value});
    }, [selectOption, setSelectOption]);

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
                const imgReg = /^image\/(png||jpg||jpeg)$/g;    
                const type = file.type;
                if(imgReg.test(type)){
                    console.log('pass');
                    formData.append('photo', file);
                }else if(!imgReg.test(type)){
                    setModalOption({show: true, message: '이미지 파일만 업로드해 주세요.'});
                    return;
                }
            }

            try{
                const response = await photoAPI.uploadPhoto(formData);
                if(selectOption.selectType === 'date' && selectOption.startDate && selectOption.endDate)
                    dispatch(getPhotoList({userEmail: user.email, startDate: selectOption.startDate, endDate: selectOption.endDate}));
                else
                    dispatch(getPhotoList({userEmail: user.email}));
            }catch(e){
                console.error(e);
            }
        });
    }, [user, selectOption, dispatch]);

    const dragDrop = useCallback(async e => {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files;
        const imgReg = /^image\/(png||jpg||jpeg)$/g;

        const formData = new FormData();
        formData.append('userEmail', user.email);

        for(const file of files){
            const type = file.type;
            if(imgReg.test(type))
                formData.append('photo', file);
            else{
                setModalOption({show: true, message: '이미지 파일만 업로드해 주세요.'});
                return;
            }
            formData.append('photo', file);
        }

        try{
            const response = await photoAPI.uploadPhoto(formData);
            if(selectOption.selectType === 'date' && selectOption.startDate && selectOption.endDate)
                dispatch(getPhotoList({userEmail: user.email, startDate: selectOption.startDate, endDate: selectOption.endDate}));
            else
                dispatch(getPhotoList({userEmail: user.email}));
        }catch(e){
            console.error(e);
        }
    }, [user, selectOption, dispatch]);

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
            setModalOption({show: true, message: '사진을 선택해 주세요.'});
            return;
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
                if(selectOption.selectType === 'date' && selectOption.startDate && selectOption.endDate)
                    dispatch(getPhotoList({userEmail: user.email, startDate: selectOption.startDate, endDate: selectOption.endDate}));
                else
                    dispatch(getPhotoList({userEmail: user.email}));
            }
        }catch(e){
            console.error(e);
        }finally{
            setCurrPhoto(null);
        }
    }

    const deletePhotos = useCallback(async () => {
        if(!chosenList || chosenList.length === 0){
            setModalOption({show: true, message: '사진을 선택해 주세요.'});
            return;
        }
        try{
            await photoAPI.deletePhotos(chosenList);
            if(selectOption.selectType === 'date' && selectOption.startDate && selectOption.endDate)
                dispatch(getPhotoList({userEmail: user.email, startDate: selectOption.startDate, endDate: selectOption.endDate}));
            else
                dispatch(getPhotoList({userEmail: user.email}));
            setChosenList([]);

        }catch(e){
            console.error(e);
        }finally{
            setCurrPhoto(null);
        }
    }, [user, chosenList, selectOption, dispatch]);

    const closeModal = () => {
        setModalOption({message: '', show: false});
    };

    useEffect(() => {
        if(user)
            dispatch(getPhotoList({userEmail: user.email}));
    }, [user, dispatch])

    return(
        <>
            <Photo 
                user={user}
                searchImage={searchImage}
                selectOption={selectOption}
                setSelectOption={setSelectOption}
                onChangeRadio={onChangeRadio}
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
                deletePhotos={deletePhotos}
            />
            { modalOption.show && 
                <Modal onConfirm={closeModal} message={modalOption.message} />
            }
        </>
    );
};

export default PhotoContainer;
