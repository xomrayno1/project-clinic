import axiosClient from '../api/axiosClient'

const auth =  JSON.parse(localStorage.getItem('auth'));
const patientApi = {
    getAll : (params) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const {jwt} = auth.user;
        const url = "http://localhost:8080/api/v1/patients";
        return axiosClient.get(url,{
            params,
            headers : { 
                'Authorization': `Bearer ${jwt}`
            },
        })
    },
    update : (params) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const {jwt} = auth.user;
        const url = "http://localhost:8080/api/v1/patients";
        return axiosClient.put(url, params,{
            headers : { 
                'Authorization': `Bearer ${jwt}`
            },
        })
    },
    delete : (id) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const {jwt} = auth.user;
        const url = `http://localhost:8080/api/v1/patients/${id}`;
        return axiosClient.delete(url,{
            headers : { 
                'Authorization': `Bearer ${jwt}`
            },
        })
    },
    restore : (id) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const {jwt} = auth.user;
        const url = `http://localhost:8080/api/v1/patients/restore/${id}`;
        return axiosClient.get(url,{
            headers : { 
                'Authorization': `Bearer ${jwt}`
            },
        })
    },
}
export default patientApi ;