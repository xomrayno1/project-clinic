import {
    GET_ALL_PATIENT,
    UPDATE_PATIENT,
    SET_STATE_MODAL_PATIENT,
    RESTORE_PATIENT,
    DELETE_PATIENT
    }
    from '../../utils/Constant'

export const fetchPatient = (data)=>{
    return {
        type : GET_ALL_PATIENT,
        payload : data
    }
}
export const deletePatient = (data)=>{
    return {
        type : DELETE_PATIENT,
        payload : data
    }
}
export const restorePatient = (data)=>{
    return {
        type : RESTORE_PATIENT,
        payload : data
    }
}
export const updatePatient = (data, onCancel) =>{
    return {
        type: UPDATE_PATIENT,
        payload: data,
        onCancel
    }
}
export const setStateModal = (data) =>{
    return {
        type:     SET_STATE_MODAL_PATIENT,
        payload : data
    }
}