import axiosClient from './axiosClient'
const userApi  ={
    getAllFilter : (params) => {
        const url = "http://localhost:8080/api/v1/users";
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const {jwt} = auth.user;
        return axiosClient.get(url, {params},{
            headers : { 
                'Authorization': `Bearer ${jwt}`
            }
        })
    },
    update : (params) => {
        const url = "http://localhost:8080/api/v1/users";
        return axiosClient.put(url, params)
    },
    findById: (userId) => {
        const url = `http://localhost:8080/api/v1/users/${userId}`;
        return axiosClient.get(url);
    },
    delete : (id) => {
        const url = `http://localhost:8080/api/v1/users/${id}`;
        return axiosClient.delete(url)
    },
    restore : (id) => {
        const url = `http://localhost:8080/api/v1/users/restore/${id}`;
        return axiosClient.get(url)
    },
    create : (params) => {
        const url = 'http://localhost:8080/api/v1/users';
        return axiosClient.post(url, params)
    }
}
export default userApi;