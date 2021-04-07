import axiosClient from '../api/axiosClient'

const patientApi = {
    getAll : (params) => {
        const url = "http://localhost:8080/api/v1/patients";
        return axiosClient.get(url, {params})
    },
    update : (params) => {
        const url = "http://localhost:8080/api/v1/patients";
        return axiosClient.put(url, params)
    },
    delete : (id) => {
        const url = `http://localhost:8080/api/v1/patients/${id}`;
        return axiosClient.delete(url)
    },
    restore : (id) => {
        const url = `http://localhost:8080/api/v1/patients/restore/${id}`;
        return axiosClient.get(url)
    },
}
export default patientApi ;