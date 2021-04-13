import {
    CANCEL_BOOKING,
    CANCEL_BOOKING_SUCCESS,
    CANCEL_BOOKING_FAILED,
    CREATE_BOOKING,
    CREATE_BOOKING_FAILED,
    CREATE_BOOKING_SUCCESS,


    FETCH_BOOKING,
    FETCH_BOOKING_SUCCESS,
    FETCH_BOOKING_FAILED,
 
} from '../../../utils/Constant'

const initalState = {
    isLoading: false,
    error: '',
    schedules : ''
}
function bookingReducer(state = initalState, action) {
    const { type, payload } = action;
    switch (type) {
        case FETCH_BOOKING:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_BOOKING_SUCCESS:
            return {
                ...state,
                isLoading: false,
                schedules : payload
            }
        case FETCH_BOOKING_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
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
export default  bookingReducer;