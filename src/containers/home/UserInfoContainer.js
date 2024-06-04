import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "../../components/main/UserInfo"
import { useSelector, useDispatch } from "react-redux";
import { updateUserinfo, updateMessage, withdrawal } from "../../modules/auth/user";

const UserInfoContainer = () => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const { user, session } = useSelector(({user, auth}) => ({
        user: user.user,
        session: auth.session
    }));

    useEffect(() => {
        if(!user || !session){
            history('/login');
        }
    }, [user, session, history]);

    const { updateMsg, error } = useSelector(({user}) => ({
        updateMsg: user.updateMsg,
        error: user.error
    }));

    const [modalOption, setModalOption] = useState(
        {
            show: false,
            message: null,
            type: 'info2'
        }
    );

    useEffect(() => {
        if(!user){
            history('/login');
            return;
        }
       
    }, [user, history, updateMsg, modalOption]);

    const [form, setForm] = useState(
        user ? 
        {
            email: user.email,
            username: user.username,
            password: null,
            passConfirm: null
        } : {
            email: null,
            username: null,
            password: null,
            passConfirm: null
        }
    );
    
    const [errForm, setErrForm] = useState(
        {
            username: null,
            password: null,
            passConfirm: null
        }
    );

    const proceedWithdrawal = () => {
        dispatch(withdrawal(user.email));
        console.log('회원탈퇴');
        setModalOption({message: null, show: false});
    }

    const closeModal = () => {
        setModalOption({message: null, show: false});
        dispatch(updateMessage(null));
    }

    const updateUserInfo = (info) => {
        dispatch(updateUserinfo(info));
        if(!error){
            setModalOption({show: true, message: '정보가 수정되었습니다.'});
        }
    };

    const onChangeForm = useCallback(e => {
        setForm(
            {
                ...form,
                [e.target.name]: e.target.value
            }
        )
    }, [form]);

    const onBlurForm = useCallback(e => {
        let { name, value } = e.target;

        if(name === 'username'){
            const username_regex = /^[가-힣a-zA-Z0-9\s]{2,20}$/;
            let testUsername = username_regex.test(value);
            if(!testUsername){
                setErrForm({...errForm, username: '2~20 자의 한글, 영문을 입력해 주세요.'});
            }else if(testUsername){
                setErrForm({...errForm, username: null});
            }
        }else if(name === 'password'){
            const password_regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;
            let testPassword = password_regex.test(value);
            if(!testPassword && value.length > 0){
                setErrForm({...errForm, password: '8~16자의 대소문자 및 특수문자를 포함하여 입력해 주세요.'});
            }else if(testPassword || value.length === 0){
                setErrForm({...errForm, password: null});
            }

        }else if(name === 'passConfirm'){
            let testPassConfirm = form.password === form.passConfirm;
            if(!testPassConfirm && form.password.length > 0){
                setErrForm({...errForm, passConfirm: '비밀번호가 일치하지 않습니다.'});
            }else if(testPassConfirm || value.length === 0){
                setErrForm({...errForm, passConfirm: null});
            }
        }
    }, [errForm, form]);

    const submitUpdate = () => {
        if(errForm.username){
            setModalOption({show: true, message: '이름을 확인해 주세요.'});
            return;
        }

        if(errForm.password || errForm.passConfirm){
            setModalOption({show: true, message: '비밀번호를 확인해 주세요.'});
            return;
        }
        updateUserInfo(form);
    };
    
    const onWithdrawal = () => {
        setModalOption({ type: 'confirm', show: true, message: `탈퇴 시 모든 데이터가 삭제됩니다. 정말 탈퇴하시겠습니까?`});
    };


    return(
        <div>
            {user &&
                <UserInfo 
                    user={user} 
                    updateUserInfo={updateUserInfo} 
                    form={form} 
                    errForm={errForm} 
                    onChangeForm={onChangeForm} 
                    onBlurForm={onBlurForm}
                    submitUpdate={submitUpdate}
                    withdrawal={onWithdrawal}
                    showModal={modalOption.show} 
                    modalMsg={modalOption.message} 
                    modalType={modalOption.type}
                    proceedWithdrawal={proceedWithdrawal}
                    closeModal={closeModal} />
            }
        </div>
    );
};

export default UserInfoContainer;