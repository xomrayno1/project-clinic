import {
    CANCEL_BOOKING,
    CANCEL_BOOKING_SUCCESS,
    CANCEL_BOOKING_FAILED,
    CREATE_BOOKING,
    CREATE_BOOKING_FAILED,
    CREATE_BOOKING_SUCCESS,
} from '../../../utils/Constant'

const initalState = {
    isLoading: false,
    error: '',
    schedules : ''
}
function scheduleReducer(state = initalState, action) {
    const { type, payload } = action;
    switch (type) {
        case CANCEL_BOOKING:
            return {
                ...state,
                isLoading: true
            }
        case CANCEL_BOOKING_SUCCESS:
            return {
                ...state,
                isLoading: false,
                schedules : payload
            }
        case CANCEL_BOOKING_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case CREATE_BOOKING:
            return {
                ...state,
                isLoading: true
            }
        case CREATE_BOOKING_SUCCESS:
            return {
                ...state,
                isLoading: false,
                schedules : payload
            }
        case CREATE_BOOKING_FAILED:
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