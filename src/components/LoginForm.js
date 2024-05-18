import { Link } from 'react-router-dom';
import './css/LoginForm.scss';
import styled from 'styled-components';

const LoginForm = ({ onChange }) => {
    return(
        <div className='Login'>
            <div className='Wrapper'>
                <form method='post'>
                    <div className='title'>My Cloud</div>
                    <div>
                        <input className='acc_input' name="username" placeholder='아이디' onChange={onChange} />
                        <input className='acc_input' name="password" placeholder='비밀번호' onChange={onChange} />
                    </div>
                    <div className='btn wrapper'>
                        <button className='btn login'>로그인</button>
                    </div>
                </form>
                <div className='btn wrapper register'>
                    <Link to='/register'>회원가입</Link>
                </div>
                
                <hr />
                <div className='btn wrapper'>
                    <Link className='btn_sns' to=''>Kakao 로그인</Link>
                </div>
                <div className='btn wrapper'>
                    <Link className='btn_sns' to=''>Google 로그인</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;