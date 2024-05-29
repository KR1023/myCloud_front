import client from './client';

export const register = ({email, password, username}) => client.post('/auth/register', { email, password, username });

export const login = ({email, password}) => client.post('/auth/login', {email, password});

export const checkDuplicate = ({email}) => client.get(`/user/${email}`);

export const logout = () => client.get('/auth/logout');

export const checkAuth = () => client.get('/auth/check-auth');