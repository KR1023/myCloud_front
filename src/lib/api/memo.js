import client from "./client";

export const createMemo = ({title, body, userEmail}) => client.post('/memo', {subject: title, content: body, userEmail});