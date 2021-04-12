import axiosClient from './axiosClient'
 
const userApi  ={
    getAllFilter : (params) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const url = "http://localhost:8080/api/v1/users";
        const {jwt} = auth.user;
        return axiosClient.get(url,{  
            headers : { 
                'Authorization': `Bearer ${jwt}`
            },
            params
        })
    },
    update : (params) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const url = "http://localhost:8080/api/v1/users";
        const {jwt} = auth.user;
        return axiosClient.put(url,params, {
            headers : { 
                'Authorization': `Bearer ${jwt}`
            },
        })
    },
    updateProfileDoctor: (params) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const url = "http://localhost:8080/api/v1/users/doctor";
        const {jwt,id} = auth.user;
        params.userId = id;
        return axiosClient.put(url,params, {
            headers : { 
                'Authorization': `Bearer ${jwt}`
            },
        })
    },
    updateProfilePatient: (params) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const url = "http://localhost:8080/api/v1/users/patients";
        const {jwt,id} = auth.user;
        params.userId = id;
        return axiosClient.put(url,params, {
            headers : { 
                'Authorization': `Bearer ${jwt}`
            },
        })
    },
    findById: (userId) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const {jwt} = auth.user;
        const url = `http://localhost:8080/api/v1/users/${userId}`;
        return axiosClient.get(url,{
            headers : { 
                'Authorization': `Bearer ${jwt}`
            },
        });
    },
    findDoctorByUser: (param) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const {jwt,id} = auth.user;
        const url = `http://localhost:8080/api/v1/users/${id}/doctor`;
        return axiosClient.get(url,{
            headers : { 
                'Authorization': `Bearer ${jwt}`
            },
        });
    },
    findPatientByUser: () => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const {jwt,id} = auth.user;
        const url = `http://localhost:8080/api/v1/users/${id}/patients`;
        return axiosClient.get(url,{
            headers : { 
                'Authorization': `Bearer ${jwt}`
            },
        });
    },
    delete : (id) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const url = `http://localhost:8080/api/v1/users/${id}`;
        const {jwt} = auth.user;
        return axiosClient.delete(url,{
            headers : { 
                'Authorization': `Bearer ${jwt}`
            },
        })
    },
    restore : (id) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const url = `http://localhost:8080/api/v1/users/restore/${id}`;
        const {jwt} = auth.user;
        return axiosClient.get(url, {
            headers : { 
                'Authorization': `Bearer ${jwt}`
            },
        })
    },
    create : (params) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const {jwt} = auth.user;
        const url = 'http://localhost:8080/api/v1/users';
        return axiosClient.post(url, params,{
            headers : { 
                'Authorization': `Bearer ${jwt}`
            },
        })
    }
}
export default userApi;