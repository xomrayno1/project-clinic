import axios from 'axios';
import axiosClient from '../api/axiosClient'

const doctorApi = {
    getAllFilter : (params) => {
        const url = "http://localhost:8080/api/v1/doctors";
        return axiosClient.get(url, {params})
    },
    update : (params) => {
        const url = "http://localhost:8080/api/v1/doctors";
        return axiosClient.put(url, params)
    },
    getAll : () => {
        const url = "http://localhost:8080/api/v1/doctors/getAll";
        return axiosClient.get(url);
    },
    findById: (doctorId) => {
        const url = `http://localhost:8080/api/v1/doctors/${doctorId}`;
        return axiosClient.get(url);
    }
}
export default doctorApi ;