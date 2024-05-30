    import { Link } from 'react-router-dom';
import '../css/ControlBox.scss';

const ControlBox = ({mouseOut, onLogout}) => {

    const preventDefault = e => {
        e.preventDefault();
        console.log(e);
    }

    return(
        <div className="info_box" onMouseOut={mouseOut}>
            <div className="wrapper">
                <span><Link to="/user-info">회원 정보</Link></span>
                <span onClick={onLogout}>로그아웃</span>
            </div>
        </div>
    );
};

export default ControlBox;