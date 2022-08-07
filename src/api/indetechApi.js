import axios from 'axios';
import { baseUrl } from '../helpers';

const indetechApi = axios.create({
    baseURL: baseUrl
});

//interceptors
indetechApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return config;
})

export default indetechApi;