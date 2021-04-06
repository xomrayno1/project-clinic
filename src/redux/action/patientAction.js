import {
    GET_ALL_PATIENT,
    UPDATE_PATIENT,
    SET_STATE_MODAL_PATIENT
    }
    from '../../utils/Constant'

export const fetchPatient = (data)=>{
    return {
        type : GET_ALL_PATIENT,
        payload : data
    }
}
export const updatePatient = (data) =>{
    return {
        type: UPDATE_PATIENT,
        payload: data
    }
}
export const setStateModal = (data) =>{
    return {
        type:     SET_STATE_MODAL_PATIENT,
        payload : data
    }
}