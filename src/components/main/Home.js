import HeaderContainer from '../../containers/common/HeaderContainer';
import { useCallback, useState } from 'react';
import '../css/Home.scss';
import memo from '../../images/memo/memo_3.png';
import Workspace from '../common/Workspace';

const Home = () => {
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
            <HeaderContainer />
            <div className="wrapper">
                <div className="container memo" id="icon_memo" onClick={onClickIcon} data-app='memo'>
                    <img src={memo} alt="memo_icon" width="80" height="80" data-app='memo'/>
                    <span data-app='memo'>메모</span>
                </div>
                <div className="container photo" id="icon_photo" onClick={onClickIcon} data-app='photo'>
                    <img src={memo} alt="photo_icon" width="80" height="80" data-app='photo' />
                    <span>사진</span>
                </div>
                <div className="container photo" id="icon_explorer" onClick={onClickIcon} data-app='explorer'>
                    <img src={memo} alt="explorer_icon" width="80" height="80" data-app='explorer' />
                    <span>탐색기</span>
                </div>
            </div>
            {   wType === 'memo' &&
                <Workspace title="memo" closeWorkspace={closeWorkspace} />
            }
            {
                wType === 'photo' &&
                <Workspace title="photo" closeWorkspace={closeWorkspace} />
            }
            {
                wType === 'explorer' &&
                <Workspace title="explorer" closeWorkspace={closeWorkspace} />
            }
            
        </div>
    );
};

export default Home;