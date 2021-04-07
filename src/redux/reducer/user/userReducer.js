import {
    GET_ALL_USER,
    GET_ALL_USER_SUCCESS,
    GET_ALL_USER_FAILED,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,
    DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILED
}
    from '../../../utils/Constant'
const initalState = {
    users: '',
    isLoading: false,
    error: '',
    user: ''
}
function userReducer(state = initalState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_ALL_USER:
            return {
                ...state,
                isLoading: true
            }
        case GET_ALL_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                users: payload
            }
        case GET_ALL_USER_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case UPDATE_USER:
            return {
                ...state,
                isLoading: true
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                users: payload
            }
        case UPDATE_USER_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case DELETE_USER:
            return {
                ...state,
                isLoading: true
            }
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                users: payload
            }
        case DELETE_USER_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        default:
            return state;
    }
}
export default userReducer;