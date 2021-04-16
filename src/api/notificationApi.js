import axiosClient from './axiosClient'

const notificationApi  = {
    getAll : () => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const {jwt} = auth.user;
        const url = "http://localhost:8080/api/v1/notifications";
        return axiosClient.get(url,{
            headers : { 
                'Authorization': `Bearer ${jwt}`
            },
        })
    },
    updateSeen: (id) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const {jwt} = auth.user;
        const url = "http://localhost:8080/api/v1/notifications/seen/update";
        return axiosClient.put(url, {
            notiId : id
        } , {
            headers : { 
                'Authorization': `Bearer ${jwt}`
            },
        })
    }
     
}
export default notificationApi;