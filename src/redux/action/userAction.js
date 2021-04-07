import {
    GET_ALL_USER,
    UPDATE_USER,
    SET_STATE_MODAL_USER,
    }
    from '../../utils/Constant'

export const fetchUser = (data)=>{
    return {
        type : GET_ALL_USER,
        payload : data
    }
}
export const updateUser = (data) =>{
    return {
        type: UPDATE_USER,
        payload: data
    }
}
export const setStateModal = (data) =>{
    return {
        type: SET_STATE_MODAL_USER,
        payload : data
    }
}