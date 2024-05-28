import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginForm from "../../components/auth/LoginForm";
import { changeField, initializeForm } from "../../modules/auth/auth";
import { login } from "../../modules/auth/user";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    
    const { form } = useSelector(({auth}) => ({
        form: auth.login
    }));

    const { loginErr } = useSelector(({user}) => ({
        loginErr: user.error
    }))

    const { user }  = useSelector(({user}) => ({
        user: user.user
    }))

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

    const onSubmit = e => {
        e.preventDefault();
        const email = form.email;
        const password = form.password;

        dispatch(login({email, password}));
        dispatch(initializeForm({form: 'login'}));
        
        document.getElementById('login_id').value = '';
        document.getElementById('login_pw').value = '';
    }

    const onConfirm = () => {
        setShowModal(false);
    }

    useEffect(() => {
        if(loginErr){
            setShowModal(true);
        }

        if(user){
            history('/');
            try{
                localStorage.setItem('user', JSON.stringify(user));
            }catch(e){
                console.error('localStorage is not working...');
            }
        }
    }, [user, history, loginErr]);

    
    return(
        <LoginForm onChange={onChange} onSubmit={onSubmit} loginErr={showModal} onConfirm={onConfirm} />
    );
};

export default LoginComponent;