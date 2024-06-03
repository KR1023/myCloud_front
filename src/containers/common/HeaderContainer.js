import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import Header from "../../components/common/Header";
import { logout } from "../../modules/auth/user";
import { useNavigate } from "react-router-dom";
import { sessionCheck } from "../../modules/auth/auth";

const HeaderContainer = () => {

    /*
    window.addEventListener("beforeunload", e => {
        localStorage.removeItem("user");
        dispatch(sessionCheck(false));
    })
    */
   
    const history = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector(({user}) => ({ user: user.user}));

    const { session } = useSelector(({auth}) => ({
        session: auth.session
    }));

    

    useEffect(() => {
        if(!user && !session){
            history('/login');
        }

        dispatch(sessionCheck());
    },[user, session, history, dispatch]);

    const onLogout = (() => {
        if(user){
            dispatch(logout());
        }
    })
    return(
        <Header user={user} onLogout={onLogout}/>
    );
};

export default HeaderContainer;