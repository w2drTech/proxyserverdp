import http from './httpService';
import apiConfig from '../utils/config.json';

const apiEndPoint = `executiveLevel/get/studentAttendanceChatDetailsByCenter`;
const apiEndPointForCircles = `executiveLevel/get/studentAttendanceDetailsByCenter`;

export function getSelectedCenterAttendance(centerId)
{
    return http.get(`${apiEndPoint}/${centerId}`);  
}
export function getSelectedCenterAttendanceForCircle(centerId)
{
    return http.get(`${apiEndPointForCircles}/${centerId}`);  
}

export default {
    getSelectedCenterAttendance,
    getSelectedCenterAttendanceForCircle
}