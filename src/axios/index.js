import axios from 'axios';
import {API_URL_PREFIX} from '../config.js';

axios.interceptors.request.use((config)=>{
    config.url = API_URL_PREFIX + config.url;
    return config;
});

export default axios;