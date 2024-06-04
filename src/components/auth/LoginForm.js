import { Link } from 'react-router-dom';
import '../css/LoginForm.scss';
import Modal from '../common/Modal';
import logo from '../../images/myCloud_logo3.png';
import kakao from '../../images/login/kakao.png';
import google from '../../images/login/google_2.png';
import { useEffect } from 'react';

const LoginForm = ({ onChange, onSubmit, loginErr, onConfirm, onChangeCheckbox}) => {

    const toGoogle = () => {
        window.open('http://localhost:4000/auth/google/', "_self");
    };

    const toKakao = () => {
        window.open('http://localhost:4000/auth/kakao/', "_self");
    };

    return(
        <div className='Login'>
            <div className='Wrapper'>
                <form onSubmit={onSubmit}>
                    <div className='title'><img src={logo} alt='logo' width="50" height="50"/><span>MyCloud</span></div>
                    <div className='inputWrapper'>
                        <input id='login_id' className='acc_input' name="email" placeholder='이메일' onChange={onChange} maxLength="50"/>
                        <input id='login_pw' className='acc_input' type="password" name="password" placeholder='비밀번호' onChange={onChange} maxLength="30" />
                    </div>
                    <div className="wrap_checkbox">
                        <input type="checkbox" id="save_id" onChange={onChangeCheckbox} />
                        <label>이메일 저장</label>
                    </div>
                    <div className='btn wrapper'>
                        <button className='btn login'>로그인</button>
                    </div>
                </form>
                <div className='btn wrapper register'>
                    <Link to='/register'>회원가입</Link>
                </div>
                
                <hr />
                <div className='btn wrapper sns'>
                    <button id='btn_kakao' className='btn_sns' onClick={toKakao}><img src={kakao} alt="kakao" width="30" height="30" /><span>kakao로 로그인</span></button>
                    <button id='btn_google' className='btn_sns' onClick={toGoogle}><img src={google} alt="google" width="28" height="28" /> <span>Google로 로그인</span></button>
                </div>
            </div>
            {   loginErr &&
                <Modal onConfirm={onConfirm} message="아이디와 비밀번호를 확인해 주세요."/>
            }
        </div>
    );
};

export default LoginForm;