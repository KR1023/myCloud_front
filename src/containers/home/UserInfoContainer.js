import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "../../components/main/UserInfo"
import { useSelector, useDispatch } from "react-redux";

const UserInfoContainer = () => {
    const dispatch = useDispatch();

    const history = useNavigate();

    const { user } = useSelector(({user}) => ({
        user: user.user
    }));

    useEffect(() => {
        if(!user){
            history('/login');
        }
    });

    return(
        <div>
            <UserInfo />
        </div>
    );
};

export default UserInfoContainer;