export default function servicePath(localPath){
    const replaceReverse = localPath.replaceAll('\\', '/');
    const uploadIdx = replaceReverse.indexOf('/uploads');

    // REACT_APP_BACKEND_ADDR = http://localhost:4000
    const backAddr = process.env.REACT_APP_BACKEND_ADDR;
    return `${backAddr}${replaceReverse.substring(uploadIdx)}`;
}