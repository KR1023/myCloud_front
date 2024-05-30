import { Link } from 'react-router-dom';
import '../css/RegisterForm.scss';
import Button from '../common/Button';
import Modal from '../common/Modal';

const RegisterForm = ({onChange, onSubmit, onBlur, exists, errEmail, errPassword, errPassConfirm, errUsername, onError, registerErr, modalMessage, onConfirm }) => {

    return(
        <div className="Register">
            <div className="Wrapper">
                <div className="title"><span>회원가입</span></div>
                <form onSubmit={onSubmit}>
                    <div className="input_wrapper">
                        <label>이메일</label><input name="email" onChange={onChange} onBlur={onBlur} />
                    </div>
                    <div className="err_message">
                        {errEmail && 
                            <span className="error" >{errEmail}</span>
                        }
                        {exists &&
                            <span className="error" >이미 존재하는 이메일 주소입니다.</span>
                        }
                    </div>
                    <div className="input_wrapper">
                        <label>비밀번호</label><input type="password" name="password" onChange={onChange} onBlur={onBlur}/>
                    </div>
                    <div className="err_message">
                        {errPassword &&
                            <span className="error" >{errPassword}</span>
                        }
                    </div>
                    <div className="input_wrapper">
                        <label>비밀번호 확인</label><input type="password" name="passConfirm" onChange={onChange} onBlur={onBlur}/>
                    </div>
                    <div className="err_message">
                        {errPassConfirm && 
                            <span className="error" >{errPassConfirm}</span>
                        }
                    </div>
                    <div className="input_wrapper">
                        <label>이름</label><input name="username" onChange={onChange} onBlur={onBlur}/>
                    </div>
                    <div className="err_message">
                        {errUsername && 
                            <span className="error" >{errUsername}</span>
                        }
                    </div>
                    {onError && 
                        <span className="error" >{onError}</span>
                    }
                    <div className="btn_wrapper">
                        <Button onClick={onSubmit}>회원가입</Button>
                    </div>
                </form>
                <div className="link_wrapper">
                    <Link to='/login'>로그인</Link>
                </div>
            </div>
            {   registerErr &&
                    <Modal onConfirm={onConfirm} message={modalMessage}/>
            }
        </div>
    );
};

export default RegisterForm;