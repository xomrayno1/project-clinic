import {
    GET_ALL_DOCTOR,
    UPDATE_DOCTOR
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