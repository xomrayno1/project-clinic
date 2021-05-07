import axiosClient from './axiosClient'

const scheduleApi  = {
    getAllFilterPagination : (params) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const {jwt} = auth.user;
        const url = "http://localhost:8080/api/v1/schedules/search_filter_pagination";
        return axiosClient.post(url,params,{
            headers : { 
                'Authorization': `Bearer ${jwt}`
            },
        })
    },
    delete : (id) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const {jwt} = auth.user;
        const url = `http://localhost:8080/api/v1/schedules/${id}`;
        return axiosClient.delete(url, {
            headers : { 
                'Authorization': `Bearer ${jwt}`
            },
        })
    },
    updateStatus: (params) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const {jwt} = auth.user;
        const url = "http://localhost:8080/api/v1/schedules/status/update";
        return axiosClient.put(url, params, {
            headers : { 
                'Authorization': `Bearer ${jwt}`
            },
        })
    },
    send: (params) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const {jwt} = auth.user;
        const url = "http://localhost:8080/api/v1/schedules/send";
        return axiosClient.post(url, params, {
            headers : { 
                'Authorization': `Bearer ${jwt}`
            },
        })
    },
    cancelSchedule : (id) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const {jwt} = auth.user;
        const url = `http://localhost:8080/api/v1/schedules/cancel/${id}`;
        return axiosClient.delete(url, {
            headers : { 
                'Authorization': `Bearer ${jwt}`
            },
        })
    }
}
export default scheduleApi;