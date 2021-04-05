import axiosClient from '../api/axiosClient'

const doctorApi = {
    getAll : (params) => {
        const url = "http://localhost:8080/api/v1/doctors";
        return axiosClient.get(url, {params})
    },
    update : (params) => {
        const url = "http://localhost:8080/api/v1/doctors";
        return axiosClient.put(url, params)
    }
}
export default doctorApi ;