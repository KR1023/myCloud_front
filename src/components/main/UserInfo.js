import '../css/UserInfo.scss';
import HeaderContainer from "../../containers/common/HeaderContainer";
import Button from '../common/Button';


const UserInfo = () => {
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
                                <input type="text" name="email" value="ysh@mycloud.com" disabled={true} />
                            </div>
                            <div className="attr_box">
                                <label>이름</label>
                                <input type="text" name="username" />
                            </div>
                            <div className="attr_box">
                                <label>비밀번호</label>
                                <input type="password" name="password" />
                            </div>
                            <div className="attr_box">
                                <label>비밀번호 확인</label>
                                <input type="password" name="passConfirm" />
                            </div>
                            <div className="attr_box">
                                <label>생성일</label>
                                <input type="text" name="createdDt" value="2024-05-28" disabled={true} />
                            </div>
                        </form>
                        <div className="btn_wrapper">
                            <Button>정보변경</Button>
                            <Button>회원탈퇴</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;