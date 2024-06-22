### MyCloud
- MyCloud Frontend Project

### .env
```
WDS_SOCKET_PORT=0
REACT_APP_BACKEND_ADDR={"BACKEND_ADDRESS"}
```
- WD_SOCKET_PORT : ws 연결 오류 시  설정

### Invalid Host header
- 도메인 접근 시 위 문구가 출력되는 경우

1. /node_modules/react-scripts/config/webpackDevServer.config.js 
2. disableFirewall 문구 검색
3. 해당 부분 설정
```
...

module.exports = function (proxy, allowedHost) {
    const disableFirewall = true;
{/*!proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true';*/}
...

}

```