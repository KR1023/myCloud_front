import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import Header from "../../components/common/Header";
import { logout } from "../../modules/auth/user";
import { useNavigate } from "react-router-dom";
import { sessionCheck } from "../../modules/auth/auth";

const HeaderContainer = ({setWType}) => {
    const history = useNavigate();
    const dispatch = useDispatch();

    const { user, session } = useSelector(({user, auth}) => ({ user: user.user, session: auth.session}));

    useEffect(() => {
        dispatch(sessionCheck());
        
        if(!user && !session){
            history('/login');
        }
    },[user, session, history, dispatch]);

    useEffect(() => {
       
    },[session, history]);

    const onLogout = (() => {
        if(user){
            if(setWType)
                setWType(null);
            dispatch(logout());
        }
    });

    
    
    return(
        <Header user={user} onLogout={onLogout}/>
    );
};

export default HeaderContainer;