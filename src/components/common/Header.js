import { useNavigate } from 'react-router-dom';
import '../css/Header.scss';
import styled from 'styled-components';

const Spacer = styled.div`
    height: 4rem;
`;

const Header = ({user, onLogout}) => {
    const history = useNavigate();

    const onClick = e => {
        // if(to){
        //     history(to);
        // }
        history('/login');

    }
    
    return (
        <>
            <div className="header">
                <div className='logo'>MyCloud</div>
                <div className="login">
                    { user ? (
                        <div className="right">
                            <span className="username">{user.username}</span>
                            <button onClick={onLogout}>로그아웃</button>
                        </div>
                    ) : (
                        <button onClick={onClick}>로그인</button>
                    )

                    }
                    
                </div>
            </div>
            <Spacer />
        </>
        
    );
};

export default Header;