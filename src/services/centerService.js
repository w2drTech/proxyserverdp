import http from './httpService';
import apiConfig from '../utils/config.json';
import axios from 'axios';

const apiEndPoint = `students/get/centers`;
export function getCenters(selectedDistrict)
{
    return http.get(`${apiEndPoint}/${selectedDistrict}`);
}