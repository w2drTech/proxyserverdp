import http from "./httpService";
import apiConfig from "../utils/config.json";

const apiEndPointForGetStudent = `students/get/studentLogin`;
const apiEndpointForInsert = `students/insert/student`;
const apiEndPointForMarkAttendance = `students/insert/student/attendanceIn`;
const apiEndPointForUpdateAttendance = `students/update/student/attendanceOut`;

export function getStudent(email) {
  return http.get(`${apiEndPointForGetStudent}/${email}`);
}
export function registerStudent(student) {

  return http.post(apiEndpointForInsert, {
    studentName: student.name,
    email: student.email,
    centerCode: student.center,
    phoneNumber: student.phone,
    parentPhoneNumber: student.guardianPhone,
    address: student.address,
  });
}
export function markAttendance(attendance) {
  return http.post(apiEndPointForMarkAttendance, {
    email: attendance.email,
    pcCode: attendance.pcId,
  });
}
export function updateAttendance(attendanceKey) {
    return http.put(apiEndPointForUpdateAttendance, {
        attendanceCode: attendanceKey,
    });
  }
export default {
  getStudent,
  registerStudent,
  markAttendance
};
