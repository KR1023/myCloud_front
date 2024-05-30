import { Link } from 'react-router-dom';
import '../css/LoginForm.scss';
import Modal from '../common/Modal';
import { Transition } from 'react-transition-group';
import logo from '../../images/myCloud_logo3.png';

const LoginForm = ({ onChange, onSubmit, loginErr, onConfirm}) => {

    const toGoogle = () => {
        window.open('http://localhost:4000/auth/google/', "_self");
    };

    return(
        <div className='Login'>
            <div className='Wrapper'>
                <form onSubmit={onSubmit}>
                    <div className='title'><img src={logo} alt='logo' width="50" height="50"/><span>MyCloud</span></div>
                    <div>
                        <input id='login_id' className='acc_input' name="email" placeholder='이메일' onChange={onChange} maxLength="50"/>
                        <input id='login_pw' className='acc_input' type="password" name="password" placeholder='비밀번호' onChange={onChange} maxLength="30" />
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
                    <button className='btn_sns' onClick={toGoogle}>Google 로그인</button>
                    {/* <Link className='btn_sns' to='/login/google'>Google 로그인</Link> */}
                </div>
            </div>
            {   loginErr &&
                <Transition in={loginErr} timeout={500}>
                    <Modal onConfirm={onConfirm}/>
                </Transition>
            }
        </div>
    );
};

export default LoginForm;