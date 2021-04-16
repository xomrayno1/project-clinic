import {
    FETCH_NOTIFICATION,
    FETCH_NOTIFICATION_SUCCESS,
    FETCH_NOTIFICATION_FAILED,
    UPDATE_SEEN,
    UPDATE_SEEN_SUCCESS,
    UPDATE_SEEN_FAILED,
  
}
    from '../../../utils/Constant'
const initalState = {
    notifications: '',
    isLoading: false,
    error: '',
 
}
function notificationReducer(state = initalState, action) {
    const { type, payload } = action;
    switch (type) {
        case FETCH_NOTIFICATION:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_NOTIFICATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                notifications: payload
            }
        case FETCH_NOTIFICATION_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case UPDATE_SEEN:
            return {
                ...state,
                isLoading: true
            }
        case UPDATE_SEEN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                notifications: payload
            }
        case UPDATE_SEEN_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        default:
            return state;
    }
}
export default notificationReducer;