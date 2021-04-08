import axiosClient from './axiosClient'
const scheduleApi  = {
    getAllFilterPagination : (params) => {
        const url = "http://localhost:8080/api/v1/schedules/search_filter_pagination";
        return axiosClient.post(url, params)
    },
   
    delete : (id) => {
        const url = `http://localhost:8080/api/v1/schedules/${id}`;
        return axiosClient.delete(url)
    },
    create : (params) => {
        const url = 'http://localhost:8080/api/v1/schedules';
        return axiosClient.post(url, params)
    }
}
export default scheduleApi;