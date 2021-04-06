import {
    GET_ALL_PATIENT,
    GET_ALL_PATIENT_SUCCESS,
    GET_ALL_PATIENT_FAILED,
    UPDATE_PATIENT,
    UPDATE_PATIENT_SUCCESS,
    UPDATE_PATIENT_FAILED
}
    from '../../../utils/Constant'
const initalState = {
    patients : '',
    isLoading: false,
    error : ''
}
function patientReducer(state = initalState, action){
    const {type, payload} = action;
    switch(type){
        case GET_ALL_PATIENT:
            return {
                ...state,
                isLoading: true
            }
        case GET_ALL_PATIENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                patients: payload
            }
        case GET_ALL_PATIENT_FAILED:
            return {
                ...state,
                isLoading: false,
                error : payload
            }
        case UPDATE_PATIENT:
            return{
                ...state,
                isLoading: true
            }
        case UPDATE_PATIENT_SUCCESS:
            return{
                ...state,
                isLoading: false,
                patients: payload
            }
        case UPDATE_PATIENT_FAILED:
            return{
                ...state,
                isLoading: false,
                error : payload
            }
        default:
            return state;
    }
}
export default  patientReducer;