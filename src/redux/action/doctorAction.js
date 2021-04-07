import {
    GET_ALL_DOCTOR,
    UPDATE_DOCTOR,
    SET_STATE_MODAL_DOCTOR,
    GET_DOCTOR,
    DELETE_DOCTOR,
    RESTORE_DOCTOR,
    FETCH_DOCTOR_ACTIVE
    }
    from '../../utils/Constant'

export const fetchDoctor = (data)=>{
    return {
        type : GET_ALL_DOCTOR,
        payload : data
    }
}
export const fetchDoctorActive = (data)=>{
    return {
        type : FETCH_DOCTOR_ACTIVE,
        payload : data
    }
}
export const getDoctor = (data)=>{
    return {
        type : GET_DOCTOR,
        payload : data
    }
}
export const updateDoctor = (data) =>{
    return {
        type: UPDATE_DOCTOR,
        payload: data
    }
}  
export const deleteDoctor = (data) =>{
    return {
        type: DELETE_DOCTOR,
        payload: data
    }
}
export const restoreDoctor = (data) =>{
    return {
        type: RESTORE_DOCTOR,
        payload: data
    }
}
export const setStateModal = (data) =>{
    return {
        type: SET_STATE_MODAL_DOCTOR,
        payload : data
    }
}