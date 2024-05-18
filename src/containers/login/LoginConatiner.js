import { useSelector, useDispatch } from "react-redux";
import LoginForm from "../../components/LoginForm";
import { changeField } from "../../modules/login/login";

const LoginComponent = () => {
    const dispatch = useDispatch();
    
    const { form } = useSelector(state => ({
        form: state.login.login
    }));

    const onChange = e => {
        const { value, name} = e.target;

        dispatch(
            changeField({
                form: 'login',
                key: name,
                value
            })
        );
    };

    return(
        <LoginForm onChange={onChange} />
    );
};

export default LoginComponent;