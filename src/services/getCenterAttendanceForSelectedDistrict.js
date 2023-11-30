import http from './httpService';
import apiConfig from '../utils/config.json';

const apiEndPoint = `executiveLevel/get/studentAttendanceChatDetailsByDistrict`;
const apiEndPointForCircles = `executiveLevel/get/studentAttendanceDetailsByDistrict`;

export function getSelectedDistrictAttendance(districtId)
{
    return http.get(`${apiEndPoint}/${districtId}`);  
}
export function getSelectedDistrictAttendanceForCircle(districtId)
{
    return http.get(`${apiEndPointForCircles}/${districtId}`);  
}

export default {
    getSelectedDistrictAttendance,
    getSelectedDistrictAttendanceForCircle
}
