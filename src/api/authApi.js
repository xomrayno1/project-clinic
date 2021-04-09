import axios from 'axios';
import axiosClient from '../api/axiosClient'

const authApi = {
    login : (params) => {
        const url = "http://localhost:8080/authenticate";
        return axiosClient.post(url, params)
    },
    register : (params) => {
        const url = "http://localhost:8080/register";
        return axiosClient.post(url, params)
    },
}
export default authApi ;