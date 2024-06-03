import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "../../components/main/UserInfo"
import { useSelector, useDispatch } from "react-redux";
import { updateUserinfo, updateMessage } from "../../modules/auth/user";

const UserInfoContainer = () => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const { user } = useSelector(({user}) => ({
        user: user.user
    }));
    const { updateMsg, error } = useSelector(({user}) => ({
        updateMsg: user.updateMsg,
        error: user.error
    }));

    const [modalOption, setModalOption] = useState(
        {
            show: false,
            message: null
        }
    );

    const closeModal = () => {
        setModalOption({messaeg: null, show: false});
        dispatch(updateMessage(null));
    }

    const updateUserInfo = (info) => {
        dispatch(updateUserinfo(info));
        if(!error){
            setModalOption({show: true, message: '정보가 수정되었습니다.'});
        }
    };
    
    useEffect(() => {
        if(!user){
            history('/login');
        }
    }, [user, history, updateMsg, modalOption]);

    return(
        <div>
            {user &&
                <UserInfo user={user} updateUserInfo={updateUserInfo} showModal={modalOption.show} modalMsg={modalOption.message} closeModal={closeModal} />
            }
        </div>
    );
};

export default UserInfoContainer;