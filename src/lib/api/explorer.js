import client from './client';

export const getDirList = ({userEmail, currDir}) => client.post(`/file/list/${userEmail}`, {currDir});