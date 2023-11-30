import http from './httpService';
import apiConfig from '../utils/config.json';

const apiEndPoint = `executiveLevel/get/studentAttendanceChatDetailsByProvince`;
const apiEndPointForCircles = `executiveLevel/get/studentAttendanceDetailsByProvince`;

export function getSelectedProvinceAttendance(provinceId)
{
    return http.get(`${apiEndPoint}/${provinceId}`);  
}
export function getSelectedProvinceAttendanceForCircle(provinceId)
{
    return http.get(`${apiEndPointForCircles}/${provinceId}`);  
}

export default {
    getSelectedProvinceAttendance,
    getSelectedProvinceAttendanceForCircle
}
