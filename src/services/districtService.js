import http from './httpService';
import apiConfig from '../utils/config.json';

const apiEndPoint = `students/get/districts`;

export function getDistricts(selectedProvince)
{
    return http.get(`${apiEndPoint}/${selectedProvince}`);
}
export default {
    getDistricts
}