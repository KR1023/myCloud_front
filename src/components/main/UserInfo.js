import '../css/UserInfo.scss';
import HeaderContainer from "../../containers/common/HeaderContainer";
import Button from '../common/Button';
import { useState, useEffect, useCallback } from 'react';
import returnDateString from '../../lib/returnDateString';
import { useNavigate } from 'react-router-dom';
import Modal from '../common/Modal';


const UserInfo = ({user, updateUserInfo, showModal, modalMsg, closeModal}) => {
    const createdDt = returnDateString(user.createdDt);

    const [form, setForm] = useState(
        {
            email: user.email,
            username: user.username,
            password: undefined,
            passConfirm: undefined
        }
    );

    const [errForm, setErrForm] = useState(
        {
            username: null,
            password: null,
            passConfirm: null
        }
    );

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
            const username_regex = /^[가-힣a-zA-Z\s]{2,20}$/;
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
        updateUserInfo(form);
    }
    
    return(
        <div className="user_info">
            <HeaderContainer />
            <div className="wrapper">
                <div className="userinfo_box">
                    <div className="title">
                        <span>회원 정보</span>
                    </div>
                    <div className="width_wrap">
                        <form>
                            <div className="attr_box">
                                <label>이메일</label>
                                <input type="text" name="email" value={user.email} disabled={true} />
                            </div>
                            <div className="attr_box">
                                <label>이름</label>
                                <input type="text" name="username" value={form.username} onChange={onChangeForm} onBlur={onBlurForm} disabled={false}/>
                                {   errForm.username && 
                                    <div className="err_message">{errForm.username}.</div>
                                }
                            </div>
                            
                            <div className="attr_box">
                                <label>비밀번호</label>
                                <input type="password" name="password" onChange={onChangeForm} onBlur={onBlurForm} />
                                {   errForm.password && 
                                    <div className="err_message">{errForm.password}</div>
                                }
                            </div>
                            <div className="attr_box">
                                <label>비밀번호 확인</label>
                                <input type="password" name="passConfirm" onChange={onChangeForm} onBlur={onBlurForm} />
                                {   errForm.passConfirm && 
                                    <div className="err_message">{errForm.passConfirm}</div>
                                }
                            </div>
                            <div className="attr_box">
                                <label>생성일</label>
                                <input type="text" name="createdDt" value={createdDt} disabled={true} />
                            </div>
                        </form>
                        <div className="btn_wrapper">
                            <Button onClick={submitUpdate}>정보변경</Button>
                            <Button>회원탈퇴</Button>
                        </div>
                    </div>
                </div>
            </div>
            { showModal &&
                <Modal onConfirm={closeModal} message={modalMsg} />
            }
        </div>
    );
};

export default UserInfo;