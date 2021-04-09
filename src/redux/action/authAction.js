import {
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_LOGOUT
}
from '../../utils/Constant'

export const loginAction = (data)=>{
    return {
        type : AUTH_LOGIN,
        payload : data
    }
}

export const registerAction = (data)=>{
    return {
        type : AUTH_REGISTER,
        payload : data
    }
}
export const logoutAction = ()=>{
    return {
        type : AUTH_LOGOUT
    }
}
 