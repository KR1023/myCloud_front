import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/Header.scss';
import styled from 'styled-components';
import ControlBox from './ControlBox';
import logo from '../../images/myCloud_logo3.png';

const Spacer = styled.div`
    height: 4rem;
`;

const Header = ({user, onLogout}) => {
    const history = useNavigate();

    const [showControl, setShowControl] = useState(false);

    const showControlBox = () => {
        setShowControl(!showControl);
    };

    const mouseOut = e => {
        setShowControl(false);
    }
    
    return (
        <>
            <div className="header">
                <div className='logo'>
                    <Link to="/">
                        <img src={logo} alt="logo" width="30" height="30"/>
                        <span>MyCloud</span>
                    </Link>
                </div>
                <div className="login">
                    { user && (
                        <div className="right">
                            <span className="username" onClick={showControlBox}>{user.username}</span>
                        </div>
                    )
                    }
                </div>
                {   showControl &&
                    <ControlBox onLogout={onLogout}/>    
                }
            </div>
            <Spacer />
        </>
        
    );
};

export default Header;