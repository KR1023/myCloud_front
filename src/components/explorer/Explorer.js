import '../css/explorer/Explorer.scss';
import folder from '../../images/explorer/explorer_folder_2.png';
import folderTop from '../../images/explorer/explorer_folder_top.png';
import iconTxt from '../../images/explorer/icon_txt.png';
import currDirImg from '../../svgs/explorer/curr_dir.svg';

const Explorer = ({loading, fileList, currDir, toTop, currFile, onClickFile}) => {

    return(
        <div className="workspace_explorer">
            <div className="explorer_header">
                <div className="explorer_search">
                    <input maxLength={30} />
                    <button className="search_file"></button>
                    <button className="to_top" onClick={toTop}></button>
                    <div className="curr_dir">
                        <input value={`${currDir !== '/' ? currDir.substring(1) : currDir}`} disabled={true} />
                    </div>
                </div>
                <div className='file_manage' >
                    {/* <button className="select_file" ></button> */}
                    <button className="create_dir"></button>
                    <button className="upload_file"></button>
                    
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
                            <img src={folderTop} alt="sample_img" />
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
                            <div className="file_el" key={file.element} onClick={(e) => {onClickFile(e, file)}}>
                                {   file.isDir && 
                                    <img src={folder} alt="sample_img" />
                                }
                                {   (!file.isDir && file.ext === '.txt') &&
                                        <img src={iconTxt} alt="sample_img" />
                                }
                                <span className="file_name">{file.element}</span>
                            </div>
                        ))
                    }
                </div>
                <div className="file_attribute">
                    { !currFile && 
                        <div className="no_file">
                            <p>선택된 항목이 없습니다.</p>
                        </div>
                    }
                </div>
            </div>
            
        </div>
    );
};

export default Explorer;