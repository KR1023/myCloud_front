import { useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/LoginForm.scss';
import Modal from '../common/Modal';

const LoginForm = ({ onChange, onSubmit, loginErr, onConfirm}) => {
    const a = useRef();

    return(
        <div className='Login'>
            <div className='Wrapper'>
                <form onSubmit={onSubmit}>
                    <div className='title'>My Cloud</div>
                    <div>
                        <input id='login_id' className='acc_input' name="email" placeholder='이메일' onChange={onChange} />
                        <input id='login_pw' className='acc_input' type="password" name="password" placeholder='비밀번호' onChange={onChange} />
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
            {   loginErr &&
                    <Modal onConfirm={onConfirm}/>
            }
            
        </div>
    );
};

export default LoginForm;