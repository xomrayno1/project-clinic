import {
    GET_ALL_USER,
    UPDATE_USER,
    SET_STATE_MODAL_USER,
    DELETE_USER,
    RESTORE_USER,
    CREATE_USER,
    GET_DOCTOR_BY_USER,
    GET_PATIENT_BY_USER,
    UPDATE_PROFILE_DOCTOR,
    UPDATE_PROFILE_PATIENT,
    SET_MODAL_INFO_USER,
    UPDATE_USER_INFO
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
export const getPatientByUser = (patientProfileRef) => {
    return {
        type: GET_PATIENT_BY_USER,
        patientRef: patientProfileRef
    }
}
export const updateProfilePatient = (patientProfileRef) => {
    return {
        type: UPDATE_PROFILE_PATIENT,
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
export const updateUser = (data, onCancel) => {
    return {
        type: UPDATE_USER,
        payload: data,
        onCancel
        // add them ref
    }
}
export const createUser = (data, onCancel) => {
    return {
        type: CREATE_USER,
        payload: data,
        onCancel
    }
}
export const setStateModal = (data) => {
    return {
        type: SET_STATE_MODAL_USER,
        payload: data
    }
}

export const setModalInfo= (data,formInfoRef) => {
    return {
        type: SET_MODAL_INFO_USER,
        payload : data,
        formInfoRef: formInfoRef
    }
}
export const updateUserInfo= (formInfoRef, setModal) => {
    return {
        type: UPDATE_USER_INFO,
        formInfoRef : formInfoRef,
        setModal: setModal
    }
}