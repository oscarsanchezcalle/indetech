import axios from 'axios';
import { baseUrl } from '../helpers';

const carpetaApi = axios.create({
    baseURL: baseUrl
});

//interceptors
carpetaApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        //'x-token': localStorage.getItem('token')
    }

    return config;
})

export default carpetaApi;