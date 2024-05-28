import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginForm from "../../components/auth/LoginForm";
import { changeField } from "../../modules/auth/auth";
import { login } from "../../modules/auth/user";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    
    const { form } = useSelector(({auth}) => ({
        form: auth.login
    }));

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

    }

    useEffect(() => {
        if(user){
            history('/');
            try{
                localStorage.setItem('user', JSON.stringify(user));
            }catch(e){
                console.error('localStorage is not working...');
            }
        }
    }, [user, history]);

    return(
        <LoginForm onChange={onChange} onSubmit={onSubmit}/>
    );
};

export default LoginComponent;