import { useDispatch, useSelector } from "react-redux";
import RegisterForm from '../../components/auth/RegisterForm';
import { changeField, register, checkUser } from "../../modules/auth/auth";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";

const RegisterContainer = () => {
    const history = useNavigate();

    const { form } = useSelector(({auth}) => ({
        form: auth.register
    }));

    const onError = useSelector(({auth}) => auth.register.error.message);
    const exists = useSelector(({auth}) => auth.register.exists);

    const dispatch = useDispatch();

    const [errEmail, setErrEmail] = useState(null);
    const [errPassword, setErrPassword] = useState(null);
    const [errPassConfirm, setErrPassConfirm] = useState(null);
    const [errUsername, setErrUsername] = useState(null);

    const onChange = e => {
        const { value, name} = e.target;

        dispatch(
            changeField({
                form: 'register',
                key: name,
                value
            })
        );
    };

    const onBlur = useCallback(e => {
        const { name, value } = e.target;
        const { password, passConfirm } = form;

        if(name === 'email'){
            const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
            let testEmail = email_regex.test(value);
            
            if(!testEmail) {
                setErrEmail('올바른 이메일 형식이 아닙니다.');
            }else if(testEmail){
                dispatch(checkUser({email: value}));
                setErrEmail(null);
            }
        }else if(name === 'password'){
            const password_regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;
            let testPassword = password_regex.test(value);
            if(!testPassword){
                setErrPassword('8~16자의 대소문자 및 특수문자를 포함하여 입력해 주세요.');
            }else if(testPassword){
                setErrPassword(null);
            }
        }else if(name === 'passConfirm'){
            let testPassConfirm = password === passConfirm;
            if(!testPassConfirm){
                setErrPassConfirm('비밀번호가 일치하지 않습니다.');
            }else if(testPassConfirm){
                setErrPassConfirm(null);
            }
        }else if(name === 'username'){
            const username_regex = /^[가-힣a-zA-Z]{2,20}$/;
            let testUsername = username_regex.test(value);
            if(!testUsername){
                setErrUsername('2~20 자의 한글, 영문을 입력해 주세요.');
            }else if(testUsername){
                setErrUsername(null);
            }
        }
    }, [dispatch, form]);

    const onSubmit = e => {
        e.preventDefault();
        const { email, password, passConfirm, username } = form;

        if(errEmail !== null || !email || exists){
            alert('이메일을 확인해 주세요.');
            return;
        }else if(errPassword !== null || errPassConfirm !== null || !password || !passConfirm){
            alert('비밀번호를 확인해 주세요.');
            return;
        }else if(errUsername !== null || !username){
            alert('이름을 확인해 주세요.');
            return;
        }else if(!email){
            
        }
        
        dispatch(register({email, password, username}));

        if(!onError){
            alert('회원 가입 성공');
            history('/login');
        }

    }

    return(
        <RegisterForm 
            onChange={onChange} 
            onSubmit={onSubmit}
            onBlur={onBlur}
            exists={exists}
            onError={onError}
            errEmail={errEmail} 
            errPassword={errPassword}
            errPassConfirm={errPassConfirm}
            errUsername={errUsername}
        />
    );
};

export default RegisterContainer;
