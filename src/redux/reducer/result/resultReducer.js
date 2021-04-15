import {
    SAVE_RESULT,
    SAVE_RESULT_SUCCESS,
    SAVE_RESULT_FAILED,

    UPDATE_RESULT,
    UPDATE_RESULT_SUCCESS,
    UPDATE_RESULT_FAILED,

    FETCH_RESULT,
    FETCH_RESULT_SUCCESS,
    FETCH_RESULT_FAILED,

    GET_RESULT_BY_SCHEDULE,
    GET_RESULT_BY_SCHEDULE_SUCCESS,
    GET_RESULT_BY_SCHEDULE_FAILED,

    SET_MODAL_RESULT,
    SET_MODAL_RESULT_SUCCESS,
    SET_MODAL_RESULT_FAILED
} from '../../../utils/Constant'

const initalState = {
    results: '',
    result: '',
    isLoading: false,
    error: '',
}

function resultReducer(state = initalState, action) {
    const { type, payload } = action;
    switch (type) {
        case FETCH_RESULT:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_RESULT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                results: payload
            }
        case FETCH_RESULT_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case GET_RESULT_BY_SCHEDULE:
            return {
                ...state,
                isLoading: true
            }
        case GET_RESULT_BY_SCHEDULE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                result: payload
            }
        case GET_RESULT_BY_SCHEDULE_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case UPDATE_RESULT:
            return {
                ...state,
                isLoading: true
            }
        case UPDATE_RESULT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                results: payload
            }
        case UPDATE_RESULT_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }

        case SAVE_RESULT:
            return {
                ...state,
                isLoading: true
            }
        case SAVE_RESULT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                results: payload
            }
        case SAVE_RESULT_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case SET_MODAL_RESULT:
            return {
                ...state,
                isLoading: true
            }
        case SET_MODAL_RESULT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                result: payload
            }
        case SET_MODAL_RESULT_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }

        default:
            return state;
    }
}
export default resultReducer;