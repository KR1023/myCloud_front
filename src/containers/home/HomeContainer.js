import { useNavigate } from "react-router-dom";
import Home from "../../components/main/Home"
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from "react";

const HomeContainer = () => {
    const history = useNavigate();
    const { user } = useSelector(({user}) => ({
        user: user.user
    }));
    
    useEffect(() => {
        if(!user){
            history('/login');
        }
    },[user, history]);

    return (
        <Home />
    );
};

export default HomeContainer;