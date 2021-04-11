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
    }
     
}
export default scheduleApi;