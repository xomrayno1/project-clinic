import axios from 'axios';
import axiosClient from '../api/axiosClient'

const auth = JSON.parse(localStorage.getItem('auth'));
const doctorApi = {
    getAllFilter: (params) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const { jwt } = auth.user;
        const url = "http://localhost:8080/api/v1/doctors";
        return axiosClient.get(url, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            params
        })
    },
    update: (params) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const { jwt } = auth.user;
        const url = "http://localhost:8080/api/v1/doctors";
        return axiosClient.put(url, params, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
        })
    },
    getAllActive: (params) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const { jwt } = auth.user;
        const url = "http://localhost:8080/api/v1/doctors/getAll";
        return axiosClient.get(url, {
            params,
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
        })
    },
    findById: (doctorId) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const { jwt } = auth.user;
        const url = `http://localhost:8080/api/v1/doctors/${doctorId}`;
        return axiosClient.get(url, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
        });
    },
    delete: (id) => {
        const { jwt } = auth.user;
        const url = `http://localhost:8080/api/v1/doctors/${id}`;
        return axiosClient.delete(url, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
        })
    },
    restore: (id) => {
        const { jwt } = auth.user;
        const url = `http://localhost:8080/api/v1/doctors/restore/${id}`;
        return axiosClient.get(url, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
        })
    }
}
export default doctorApi;