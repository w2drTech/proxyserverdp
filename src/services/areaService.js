import http from './httpService';
import apiConfig from '../utils/config.json';

const apiEndPoint = `students/get/provinces`;

export function getProvinces()
{
    return http.get(apiEndPoint)  
}

export default {
    getProvinces,
}