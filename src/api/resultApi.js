import axios from 'axios';
import axiosClient from '../api/axiosClient'

const resultApi = { 
    getAllFilter : (params) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const {jwt} = auth.user;
        const url = "http://localhost:8080/api/v1/results/search_filter_pagination";
        return axiosClient.post(url, params,{
            headers : { 
                'Authorization': `Bearer ${jwt}`
            },
        })
    },
    getResultBySchedule : (params) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const {jwt} = auth.user;
        const url = `http://localhost:8080/api/v1/results?schedule=${params}`;
        return axiosClient.get(url,{
            headers : { 
                'Authorization': `Bearer ${jwt}`
            },
        })
    },
    save : (params) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const {jwt} = auth.user;
        const url = "http://localhost:8080/api/v1/results";
        return axiosClient.post(url, params, {
            headers : { 
                'Authorization': `Bearer ${jwt}`
            },
        })
    },
    update : (params) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const {jwt} = auth.user;
        const url = "http://localhost:8080/api/v1/results";
        return axiosClient.put(url, params, {
            headers : { 
                'Authorization': `Bearer ${jwt}`
            },
        })
    },
   
}
export default resultApi ;