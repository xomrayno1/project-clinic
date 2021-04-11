import axiosClient from './axiosClient'

const bookingApi  = {
    bookingSchedule : (params) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const {jwt} = auth.user;
        const url = "http://localhost:8080/api/v1/booking";
        return axiosClient.post(url,params,{
            headers : { 
                'Authorization': `Bearer ${jwt}`
            },
        })
    },
    bookingCancel : (id) => {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const {jwt} = auth.user;
        const url = `http://localhost:8080/api/v1/booking/cancel/${id}`;
        return axiosClient.delete(url, {
            headers : { 
                'Authorization': `Bearer ${jwt}`
            },
        })
    }
}
export default bookingApi;