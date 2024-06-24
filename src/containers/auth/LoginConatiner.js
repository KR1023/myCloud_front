import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginForm from "../../components/auth/LoginForm";
import { changeField, initializeForm } from "../../modules/auth/auth";
import { googleLogin, login, loginFail } from "../../modules/auth/user";
import { useNavigate } from "react-router-dom";
import * as authAPI from '../../lib/api/auth';
// import axios from 'axios';

const LoginContainer = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [modalMsg, setModalMsg] = useState(null);
    
    const { form } = useSelector(({auth}) => ({
        form: auth.login
    }));

    const { user, loginErr, session } = useSelector(({user, auth}) => ({
        loginErr: user.error,
        user: user.user,
        session: auth.session
    }));

    const getUser = useCallback(async () => {
        try{
            // const url = 'http://localhost:4000/auth/check-auth'
            // const { data } = await axios.get(url, { withCredentials : true});

            // 백엔드 서버에서 CORS 설정을 하지 않았다면...
            const { data } = await authAPI.checkAuth(); 
            dispatch(googleLogin(data));
            localStorage.setItem('user', JSON.stringify(data));
        }catch(e){
            console.error(e);
        }
    }, [dispatch]);

    const onChange = e => {
        const { value, name } = e.target;

        dispatch(
            changeField({
                form: 'login',
                key: name,
                value
            })
        );
    };

    const onChangeCheckbox = e => {
        const checked = e.target.checked;
        const email = document.getElementById('login_id').value;

        if(checked){
            const date = new Date();
            date.setDate(date.getDate() + 7);
            document.cookie = `saved_email=${email};expires=${date.toGMTString()};path=/`;
        }else if(!checked){
            console.log('false');
            const date = new Date();
            document.cookie = `saved_email='';expires=${date}`;
        }
    }

    const onSubmit = e => {
        e.preventDefault();
        const checked = document.getElementById('save_id').checked;

        const email = form.email;
        const password = form.password;

        if(checked){
            const date = new Date();
            date.setDate(date.getDate() + 7);
            document.cookie = `saved_email=${email};expires=${date.toGMTString()};path=/`;
        }

        dispatch(login({email, password}));
        dispatch(initializeForm({form: 'login'}));
        
        document.getElementById('login_id').value = '';
        document.getElementById('login_pw').value = '';
    }

    const onConfirm = () => {
        dispatch(loginFail(null));
        setModalMsg(null);
        setShowModal(false);
    }

    useEffect(() => {
        const checkbox = document.getElementById('save_id');
        const cookie = document.cookie;

        if(cookie && cookie.length > 14){
            checkbox.checked = true;

            const idxOfKey = cookie.indexOf('saved_email=');
            const substr = cookie.substring(idxOfKey);
            const firstDel = substr.indexOf(';');

            let userEmail = '';

            if(firstDel === -1){
                userEmail = substr.substring(12);
            }else{
                userEmail = substr.substring(12, firstDel);
            }
            
            document.getElementById('login_id').value = userEmail;
            dispatch(changeField({form: 'login', key: 'email', value: userEmail}));
        }

        getUser();

        if(loginErr){
            setModalMsg(loginErr);
            setShowModal(true);
        }

        if(user && session){
            history('/');
            try{
                localStorage.setItem('user', JSON.stringify(user));
            }catch(e){
                console.error('localStorage is not working...');
            }
        }
    }, [user, session, history, loginErr, getUser, dispatch]);

    
    return(
        <LoginForm onChange={onChange} onSubmit={onSubmit} loginErr={showModal} errMsg={modalMsg} onConfirm={onConfirm} onChangeCheckbox={onChangeCheckbox} />
    );
};

export default LoginContainer;