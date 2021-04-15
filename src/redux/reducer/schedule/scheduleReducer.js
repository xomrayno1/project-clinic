import {
    GET_ALL_SCHEDULE,
    GET_ALL_SCHEDULE_SUCCESS,
    GET_ALL_SCHEDULE_FAILED,
    DELETE_SCHEDULE,
    DELETE_SCHEDULE_SUCCESS,
    DELETE_SCHEDULE_FAILED,
    CREATE_SCHEDULE,
    CREATE_SCHEDULE_SUCCESS,
    CREATE_SCHEDULE_FAILED,
    UPDATE_STATUS_SCHEDULE,
    UPDATE_STATUS_SCHEDULE_SUCCESS,
    UPDATE_STATUS_SCHEDULE_FAILED
} from '../../../utils/Constant'

const initalState = {
    schedules: '',
    isLoading: false,
    error: '',
}

function scheduleReducer(state = initalState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_ALL_SCHEDULE:
            return {
                ...state,
                isLoading: true
            }
        case GET_ALL_SCHEDULE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                schedules: payload
            }
        case GET_ALL_SCHEDULE_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
       
        case DELETE_SCHEDULE:
            return {
                ...state,
                isLoading: true
            }
        case DELETE_SCHEDULE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                schedules: payload
            }
        case DELETE_SCHEDULE_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        
        case CREATE_SCHEDULE:
            return {
                ...state,
                isLoading: true
            }
        case CREATE_SCHEDULE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                schedules: payload
            }
        case CREATE_SCHEDULE_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
            case UPDATE_STATUS_SCHEDULE:
                return {
                    ...state,
                    isLoading: true
                }
            case UPDATE_STATUS_SCHEDULE_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    schedules: payload
                }
            case UPDATE_STATUS_SCHEDULE_FAILED:
                return {
                    ...state,
                    isLoading: false,
                    error: payload
                }
        default:
            return state;
    }
}
export default  scheduleReducer;