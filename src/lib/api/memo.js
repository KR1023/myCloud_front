import client from "./client";

export const createMemo = ({title, body, userEmail}) => client.post('/memo', {subject: title, content: body, userEmail});

export const getMemoList = ({userEmail}) => client.post('/memo/list', ({userEmail}));

export const getMemo = (memoId) => client.get(`/memo/${memoId}`);

export const updateMemo = ({title, body, memoId}) => client.patch(`/memo/${memoId}`, ({subject: title, content: body}));

export const deleteMemo = ({memoId}) => client.delete(`/memo/${memoId}`);

export const uploadFile = (formData) => client.post(`/memo/upload`, formData);