import {
    GET_STATISTICAL,
    GET_STATISTICAL_SUCCESS,
    GET_STATISTICAL_FAILED,
    GET_CHART_SCHEDULE,
    GET_CHART_SCHEDULE_FAILED,
    GET_CHART_SCHEDULE_SUCCESS

} from '../../../utils/Constant'

const initalState = {
    statistical: '',
    chart: [],
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
        case GET_CHART_SCHEDULE:
            return {
                ...state,
                isLoading: true
            }
        case GET_CHART_SCHEDULE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                chart: payload
            }
        case GET_CHART_SCHEDULE_FAILED:
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