import { useSelector,useDispatch } from "react-redux";
import Header from "../../components/common/Header";
import { logout } from "../../modules/auth/user";

const HeaderContainer = () => {
    const dispatch = useDispatch();

    const { user } = useSelector(({user}) => ({ user: user.user}));

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