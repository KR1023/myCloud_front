import { Link } from 'react-router-dom';
import '../css/RegisterForm.scss';

const RegisterForm = ({onChange, onSubmit, onBlur, exists, errEmail, errPassword, errPassConfirm, errUsername, onError }) => {

    return(
        <div className="Register">
            <div className="title">회원가입</div>
            <form onSubmit={onSubmit}>
                <label>이메일</label><input name="email" onChange={onChange} onBlur={onBlur} />
                {errEmail && 
                    <span className="error" >{errEmail}</span>
                }
                {exists &&
                    <span className="error" >이미 존재하는 이메일 주소입니다.</span>
                }
                <label>비밀번호</label><input type="password" name="password" onChange={onChange} onBlur={onBlur}/>
                {errPassword &&
                    <span className="error" >{errPassword}</span>
                }
                <label>비밀번호 확인</label><input type="password" name="passConfirm" onChange={onChange} onBlur={onBlur}/>
                {errPassConfirm && 
                    <span className="error" >{errPassConfirm}</span>
                }
                <label>이름</label><input name="username" onChange={onChange} onBlur={onBlur}/>
                {errUsername && 
                    <span className="error" >{errUsername}</span>
                }
                {onError && 
                    <span className="error" >{onError}</span>
                }
                <button >회원가입</button>
            </form>
            <Link to='/login'>로그인</Link>
        </div>
    );
};

export default RegisterForm;