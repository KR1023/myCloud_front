import client from './client';

export const getDirList = ({userEmail, currDir}) => client.post(`/file/list/${userEmail}`, {currDir});

export const createDirectory = ({userEmail, currDir, dirName}) => client.post('/file/create-dir', ({userEmail, currDir, dirName}));

export const getFileAttr = (currFile) => client.post(`/file/file-attr`, currFile);