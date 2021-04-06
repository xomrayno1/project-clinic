import {
    GET_ALL_DOCTOR,
    UPDATE_DOCTOR,
    SET_STATE_MODAL_DOCTOR
    }
    from '../../utils/Constant'

export const fetchDoctor = (data)=>{
    return {
        type : GET_ALL_DOCTOR,
        payload : data
    }
}
export const updateDoctor = (data) =>{
    return {
        type: UPDATE_DOCTOR,
        payload: data
    }
}
export const setStateModal = (data) =>{
    return {
        type: SET_STATE_MODAL_DOCTOR,
        payload : data
    }
}