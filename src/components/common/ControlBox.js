    import '../css/ControlBox.scss';

const ControlBox = ({mouseOut, onLogout}) => {

    const preventDefault = e => {
        e.preventDefault();
        console.log(e);
    }

    return(
        <div className="info_box" onMouseOut={mouseOut}>
            <div className="wrapper">
                <span>회원 정보</span>
                <span onClick={onLogout}>로그아웃</span>
            </div>
        </div>
    );
};

export default ControlBox;