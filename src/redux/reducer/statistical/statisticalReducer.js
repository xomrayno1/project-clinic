import {
    GET_STATISTICAL,
    GET_STATISTICAL_SUCCESS,
    GET_STATISTICAL_FAILED,
 
} from '../../../utils/Constant'

const initalState = {
    statistical: '',
    isLoading: false,
    error: '',
}

function statisticalReducer(state = initalState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_STATISTICAL:
            return {
                ...state,
                isLoading: true
            }
        case GET_STATISTICAL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                statistical: payload
            }
        case GET_STATISTICAL_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
 
        default:
            return state;
    }
}
export default statisticalReducer;