import '../css/photo/Photo.scss';
import { useRef, useEffect, useCallback, useState } from 'react';
import returnDateString from '../../lib/returnDateString';
import servicePath from '../../lib/returnServicePath';
import returnFileSize from '../../lib/returnFileSize';

const Photo = ({
        user, 
        selectOption,
        setSelectOption,
        onChangeRadio,
        searchImage,
        photoList, 
        currPhoto, 
        setCurrPhoto, 
        chosenList, 
        setChosenList, 
        uploadPhoto, 
        dragDrop, 
        downloadAPhoto,
        downloadPhotos,
        deleteAPhoto,
        deletePhotos
    }) => {
    
    const startDateEl = useRef();
    const endDateEl = useRef();
    const photoManageEl = useRef();
    
    const [selectable, setSelectable] = useState(true);

    const onChangeDate = useCallback(e => {
        const dateType = e.target.dataset.date;
        
        if(dateType === 'start')
            setSelectOption({...selectOption, startDate: e.target.value});
        else if(dateType === 'end')
            setSelectOption({...selectOption, endDate: e.target.value});
    }, [selectOption, setSelectOption]);

    useEffect(() => {
        if(selectOption.selectType === 'all'){
            startDateEl.current.disabled = true;    
            endDateEl.current.disabled = true;
        }else{
            startDateEl.current.disabled = false;
            endDateEl.current.disabled = false;
        }
    }, [selectOption]);

    const dragEnter = e => {

    }

    const dragOver = e => {
        e.preventDefault();
        e.stopPropagation();
    }
    
    const dragLeave = e => {
    }
    
    const clickPhoto = (e, photo) => {
        setCurrPhoto(photo);
        const chosenTag = e.target.tagName;
        if(!selectable){
            if(!chosenList.includes(photo.photo_id)){
                setChosenList(chosenList.concat(photo.photo_id));
            }else{
                setChosenList(chosenList.filter(item => item !== photo.photo_id));
            }
            
            if(chosenTag === 'DIV'){
                e.target.classList.toggle('chosen');
            }else if(chosenTag === 'IMG' || chosenTag === 'SPAN'){
                e.target.parentElement.classList.toggle('chosen');
            }
        }
    }

    const selectPhotos = e => {
        setSelectable(!selectable);
        
        if(selectable){
            const nodes = document.getElementsByClassName('photo_el');
            photoManageEl.current.style.width = '120px';
            for(let i = 0; i < nodes.length; i++){
                let childs = nodes[i].childNodes;
                nodes[i].className += ' checked';

                for(let j = 0; j < childs.length; j++){
                    childs[j].className += ' checked';
                }
            }
        }else if(!selectable){
            const nodes = document.getElementsByClassName('photo_el');
            photoManageEl.current.style.width = '80px';
            for(let i = 0; i < nodes.length; i++){
                nodes[i].classList.remove('checked');
                nodes[i].classList.remove('chosen');
                let childs = nodes[i].childNodes;
                for(let j = 0; j < childs.length; j++){
                    childs[j].classList.remove('checked');
                }
            }
            setChosenList([]);
        }
    }

    return(
        <div className="workspace_photo">
            <div className="photo_header">
                <div className="photo_search">
                    <input type="radio" value="all" name="upload_date" checked={selectOption.selectType === 'all'} onChange={onChangeRadio} />전체
                    <input type="radio" value="date" name="upload_date" checked={selectOption.selectType === 'date'} onChange={onChangeRadio}/>기간
                    <input type="date" ref={startDateEl} value={selectOption.startDate} max={returnDateString(new Date())} onChange={onChangeDate} data-date='start' /> ~ 
                    <input type="date" ref={endDateEl} value={selectOption.endDate} max={returnDateString(new Date())} onChange={onChangeDate} data-date='end' />
                    <button className="search_image" onClick={searchImage}></button>
                </div>
                <div className='photo_manage' ref={photoManageEl}>
                    <button className="select_photo" onClick={selectPhotos}></button>
                    {   !selectable && 
                        <div>
                            <button className="download_photo" onClick={downloadPhotos}></button>
                            <button className="delete_photo" onClick={deletePhotos}></button>
                        </div>
                    }
                    {
                        selectable && 
                        <button className="upload_photo" onClick={uploadPhoto}></button>
                    }
                </div>
            </div>
            <div className="photo_board">
                <div className="photos" draggable={false} onDragEnter={dragEnter} onDrop={dragDrop} onDragOver={dragOver} onDragLeave={dragLeave}>
                    {   (!photoList || photoList.length === 0) && 
                        <div className="no_photos">
                            <b>이미지가 없습니다.</b>
                        </div>
                    }
                    
                    {photoList && 
                        photoList.map(photo => (
                            <div className="photo_el" key={photo.photo_id} onClick={e => {clickPhoto(e, photo)}}>
                                <img className=""src={servicePath(photo.path)} alt={photo.originalName} />
                                <span className="image_name">{photo.originalName}</span>
                            </div>
                        ))
                    }
                </div>
                <div className="photo_attribute">
                    { !currPhoto && 
                        <div className="no_photo">
                            <p>선택된 사진이 없습니다.</p>
                        </div>
                    }
                    { currPhoto && 
                        <div>
                            <div className="image_container">
                            <img src={servicePath(currPhoto.path)} alt={currPhoto.originalName} />
                            </div>
                            <p>파일 이름 : <span>{currPhoto.originalName}</span></p>
                            <p>파일 크기 : <span>{returnFileSize(currPhoto.size)}</span></p>
                            <p>업로드 시간 : <span>{new Date(currPhoto.uploadedDate).toLocaleString()}</span></p>
                            <p>
                                <button className="button_download" onClick={e => downloadAPhoto(currPhoto)}></button>
                                <button className="button_delete" onClick={e => deleteAPhoto(currPhoto)}></button>
                            </p>
                        </div>
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default Photo;