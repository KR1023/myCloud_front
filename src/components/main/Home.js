import HeaderContainer from '../../containers/common/HeaderContainer';
import { useCallback, useState, useEffect } from 'react';
import '../css/Home.scss';
import memo from '../../images/memo/memo_icon_2.png';
import photo from '../../images/photo/photo_icon.png';
import explorer from '../../images/explorer/explorer_icon.png';
import Workspace from '../common/Workspace';

const Home = ({user}) => {
    const [wType, setWType] = useState(null);

    const onClickIcon = useCallback(e => {
        const appName = e.target.dataset.app;
        setWType(appName);
    }, []);

    const closeWorkspace = () => {
        setWType(null);
    }

    return(
        <div className="Home">
            <HeaderContainer setWType={setWType} />
            <div className="wrapper">
                <div className="container memo" id="icon_memo" onClick={onClickIcon} data-app='memo'>
                    <img src={memo} alt="memo_icon" width="80" height="80" data-app='memo'/>
                    <span data-app='memo'>메모</span>
                </div>
                <div className="container photo" id="icon_photo" onClick={onClickIcon} data-app='photo'>
                    <img src={photo} alt="photo_icon" width="80" height="80" data-app='photo' />
                    <span>사진</span>
                </div>
                <div className="container explorer" id="icon_explorer" onClick={onClickIcon} data-app='explorer'>
                    <img src={explorer} alt="explorer_icon" width="80" height="80" data-app='explorer' />
                    <span>탐색기</span>
                </div>
            </div>
            {   wType === 'memo' &&
                <Workspace title="메모" closeWorkspace={closeWorkspace} />
            }
            {
                wType === 'photo' &&
                <Workspace title="사진" closeWorkspace={closeWorkspace} />
            }
            {
                wType === 'explorer' &&
                <Workspace title="탐색기" closeWorkspace={closeWorkspace} />
            }
            
        </div>
    );
};

export default Home;