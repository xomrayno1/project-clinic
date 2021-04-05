import {
    GET_ALL_DOCTOR,
    GET_ALL_DOCTOR_SUCCESS,
    GET_ALL_DOCTOR_FAILED,
    UPDATE_DOCTOR,
    UPDATE_DOCTOR_SUCCESS,
    UPDATE_DOCTOR_FAILED
}
    from '../../utils/Constant'
const initalState = {
    doctors : '',
    isLoading: false,
    error : ''
}
function doctorReducer(state = initalState, action){
    const {type, payload} = action;
    switch(type){
        case GET_ALL_DOCTOR:
            return {
                ...state,
                isLoading: true
            }
        case GET_ALL_DOCTOR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                doctors: payload
            }
        case GET_ALL_DOCTOR_FAILED:
            return {
                ...state,
                isLoading: false,
                error : payload
            }
        case UPDATE_DOCTOR:
            return{
                ...state,
                isLoading: true
            }
        case UPDATE_DOCTOR_SUCCESS:
            return{
                ...state,
                isLoading: false,
                doctors: payload
            }
        case UPDATE_DOCTOR_FAILED:
            return{
                ...state,
                isLoading: false,
                error : payload
            }
        default:
            return state;
    }
}
export default  doctorReducer;