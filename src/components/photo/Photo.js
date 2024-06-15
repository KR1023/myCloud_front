import '../css/photo/Photo.scss';
import { useRef, useEffect, useCallback, useState } from 'react';
import returnDateString from '../../lib/returnDateString';
import servicePath from '../../lib/returnServicePath';
import returnFileSize from '../../lib/returnFileSize';

const Photo = ({user, photoList, uploadPhoto, dragDrop}) => {
    const startDateEl = useRef();
    const endDateEl = useRef();

    const [selectType, setSelectType] = useState('all');
    const [startDate, setStartDate] = useState(returnDateString(new Date()));
    const [endDate, setEndDate] = useState(returnDateString(new Date()));

    const [currPhoto, setCurrPhoto] = useState(null);

    const onChangeRadio = useCallback(e => {
        console.log(e.target.value);
        setSelectType(e.target.value);
    }, []);

    const onChangeDate = useCallback(e => {
        console.log(e.target.dataset.date);
        const dateType = e.target.dataset.date;

        if(dateType === 'start')
            setStartDate(e.target.value);
        else if(dateType === 'end')
            setEndDate(e.target.value);
    }, []);

    useEffect(() => {
        if(selectType === 'all'){
            startDateEl.current.disabled = true;    
            endDateEl.current.disabled = true;
        }else{
            startDateEl.current.disabled = false;
            endDateEl.current.disabled = false;
        }
    }, [selectType, startDate]);

    const dragEnter = e => {

    }

    const dragOver = e => {
        e.preventDefault();
        e.stopPropagation();
    }
    
    const dragLeave = e => {
    }
    
    const clickPhoto = photo => {
        setCurrPhoto(photo);
    }

    return(
        <div className="workspace_photo">
            <div className="photo_header">
                <div className="photo_search">
                    <input type="radio" value="all" name="upload_date" checked={selectType === 'all'} onChange={onChangeRadio} />전체
                    <input type="radio" value="date" name="upload_date" checked={selectType === 'date'} onChange={onChangeRadio}/>기간
                    <input type="date" ref={startDateEl} value={startDate} max={returnDateString(new Date())} onChange={onChangeDate} data-date='start' /> ~ 
                    <input type="date" ref={endDateEl} value={endDate} max={returnDateString(new Date())} onChange={onChangeDate} data-date='end' />
                </div>
                <div className='photo_manage'>
                    <button className="select_photo"></button>
                    <button className="upload_photo" onClick={uploadPhoto}></button>
                    <button className="download_photo"></button>
                    <button className="delete_photo"></button>
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
                            <div className="photo_el" key={photo.photo_id} onClick={e => {clickPhoto(photo)}}>
                                <img src={servicePath(photo.path)} alt={photo.originalName} />
                                <div>{photo.originalName}</div>
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
                        </div>
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default Photo;