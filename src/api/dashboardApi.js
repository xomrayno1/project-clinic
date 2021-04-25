import axiosClient from '../api/axiosClient'

const dashboardApi = {
    statistical: () => {
        const auth = JSON.parse(localStorage.getItem('auth'));
        const { jwt } = auth.user;
        const url = "http://localhost:8080/api/v1/dashboard/statistical";
        return axiosClient.get(url, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },

        })
    },
}
export default dashboardApi;