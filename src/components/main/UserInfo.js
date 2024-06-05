import '../css/UserInfo.scss';
import HeaderContainer from "../../containers/common/HeaderContainer";
import Button from '../common/Button';
import returnDateString from '../../lib/returnDateString';
import Modal from '../common/Modal';


const UserInfo = ({user, form, errForm, onChangeForm, onBlurForm, showModal, modalMsg, modalType, closeModal, submitUpdate, withdrawal, proceedWithdrawal}) => {
    const createdDt = returnDateString(user.createdDt);
    
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
                                <input type="text" name="username" value={form.username} onChange={onChangeForm} onBlur={onBlurForm} disabled={false} maxLength="20" />
                                {   errForm.username && 
                                    <div className="err_message">{errForm.username}.</div>
                                }
                            </div>
                            
                            <div className="attr_box">
                                <label>비밀번호</label>
                                <input type="password" name="password" onChange={onChangeForm} onBlur={onBlurForm} maxLength="16" />
                                {   errForm.password && 
                                    <div className="err_message">{errForm.password}</div>
                                }
                            </div>
                            <div className="attr_box">
                                <label>비밀번호 확인</label>
                                <input type="password" name="passConfirm" onChange={onChangeForm} onBlur={onBlurForm} maxLength="16"/>
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
                            <Button onClick={withdrawal}>회원탈퇴</Button>
                        </div>
                    </div>
                </div>
            </div>
            
            { showModal &&
                <Modal onConfirm={closeModal} message={modalMsg} type={modalType} proceed={proceedWithdrawal}/>
            }
        </div>
    );
};

export default UserInfo;