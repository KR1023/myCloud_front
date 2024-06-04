import client from "./client";

export const getUserInfo = ({ email }) => client.get(`/user/${email}`);

export const updateUserInfo = (updateForm) => client.patch(`/user/${updateForm.email}`, updateForm);

export const withdrawal = (email) => client.delete(`/user/${email}`);