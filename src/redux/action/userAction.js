import {
    GET_ALL_USER,
    UPDATE_USER,
    SET_STATE_MODAL_USER,
    DELETE_USER,
    RESTORE_USER,
    CREATE_USER,
    GET_DOCTOR_BY_USER,
    GET_PATIENT_BY_USER,
    UPDATE_PROFILE_DOCTOR
}
    from '../../utils/Constant'

export const getDoctorByUser = (data,doctorProfileRef) => {
    return {
        type: GET_DOCTOR_BY_USER,
        payload: data,
        doctorRef: doctorProfileRef
    }
}
export const updateProfileDoctor = (doctorProfileRef) => {
    return {
        type: UPDATE_PROFILE_DOCTOR,
        doctorRef: doctorProfileRef
    }
}
export const getPatientByUser = (data,patientProfileRef) => {
    return {
        type: GET_PATIENT_BY_USER,
        payload: data,
        patientRef: patientProfileRef
    }
}
export const fetchUser = (data) => {
    return {
        type: GET_ALL_USER,
        payload: data
    }
}

export const deleteUser = (data) => {
    return {
        type: DELETE_USER,
        payload: data
    }
}

export const restoreUser = (data) => {
    return {
        type: RESTORE_USER,
        payload: data
    }
}
export const updateUser = (data) => {
    return {
        type: UPDATE_USER,
        payload: data
        // add them ref
    }
}
export const createUser = (data) => {
    return {
        type: CREATE_USER,
        payload: data
    }
}
export const setStateModal = (data) => {
    return {
        type: SET_STATE_MODAL_USER,
        payload: data
    }
}