import axios from 'axios';
import auth from '../auth/auth';
import { BASE_URL } from './Constants';

const instance = axios.create({
   baseURL: BASE_URL,
});

instance.defaults.headers.common['auth-token'] = auth.getToken();

export default instance;
