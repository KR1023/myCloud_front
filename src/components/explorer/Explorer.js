import '../css/explorer/Explorer.scss';
import folderTop from '../../images/explorer/explorer_folder_top.png';
import iconTxt from '../../images/explorer/icon_txt.png';
import returnFileSize from '../../lib/returnFileSize';
import { returnFileIcon } from '../../lib/returnFileIcon';

const Explorer = ({
        ctxRef, 
        loading, 
        fileList, 
        currDir, 
        toTop, 
        onClickFile, 
        onCreateDir, 
        showContextMenu, 
        closeContextMenu, 
        showAttr, 
        currFileAttr,
        onChangeTargetName,
        onDownloadFile,
        onUploadFile,
        onDeleteFile
        }) => {
    
    return(
        <div className="workspace_explorer" onClick={closeContextMenu}>
            <div className="explorer_header">
                <div className="explorer_search">
                    {/* <input maxLength={30} />
                    <button className="search_file"></button> */}
                    <button className="to_top" onClick={toTop}></button>
                    <div className="curr_dir">
                        <input value={`${currDir !== '/' ? currDir.substring(1) : currDir}`} disabled={true} />
                    </div>
                </div>
                <div className='file_manage' >
                    {/* <button className="select_file" ></button> */}
                    <button className="create_dir" onClick={onCreateDir}></button>
                    <button className="upload_file" onClick={onUploadFile}></button>
                    
                </div>
            </div>
            <div className="explorer_board">
                <div className="files">
                    { ((!fileList || fileList.length === 0) && currDir === '/') && 
                        <div className="no_files">
                            <b>파일이 없습니다.</b>
                        </div>
                    }
                    {
                        (!loading && currDir !== '/') &&
                        <div className="file_el top" onClick={toTop}>
                            <img src={folderTop} alt="image_top" />
                            <span className="file_name" >..</span>
                        </div>
                    }
                    {   loading &&
                        <div className="no_files">
                            <b>목록 불러오는 중...</b>
                        </div>
                    }
                    {   (!loading && fileList) &&
                        fileList.map(file => (
                            <div className="file_el" key={file.element} onClick={(e) => {onClickFile(e, file)}} onContextMenu={(e) => showContextMenu(e, file)}>
                                <img src={returnFileIcon(file)} alt={file.element} />
                                <span className="file_name">{file.element}</span>
                            </div>
                        )).sort((el) => {
                            return !el.isDir;
                        })
                    }
                    {
                        <div className="context_menu" ref={ctxRef} onContextMenu={(e) => e.preventDefault()}>
                            <div onClick={showAttr}>속성</div>
                            <div onClick={onChangeTargetName}>이름 변경</div>
                            <div onClick={onDownloadFile}>다운로드</div>
                            <div onClick={onDeleteFile}>삭제</div>
                        </div>
                    }
                </div>
                <div className="file_attribute" >
                    { !currFileAttr && 
                        <div className="no_file">   
                            <p>선택된 항목이 없습니다.</p>
                        </div>
                    }
                    {
                        currFileAttr &&
                        <div className="file_container">
                            <div className="file_name">이름 : {currFileAttr.filename}
                                <div className="file_name tooltip"><div>{currFileAttr.filename}</div></div>
                            </div>
                            {   currFileAttr.size !== 0 &&
                                <div>크기 : {returnFileSize(currFileAttr.size)}</div>
                            }
                            <div>생성일 : {new Date(currFileAttr.birthtime).toLocaleString()}</div>
                            <div>변경일 : {new Date(currFileAttr.ctime).toLocaleString()}</div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Explorer;