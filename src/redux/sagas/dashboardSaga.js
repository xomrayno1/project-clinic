import {takeLatest, put, call} from 'redux-saga/effects'
import {message} from 'antd'

import {
   GET_STATISTICAL,
   GET_STATISTICAL_SUCCESS,
   GET_STATISTICAL_FAILED,
   GET_CHART_SCHEDULE,
   GET_CHART_SCHEDULE_SUCCESS,
   GET_CHART_SCHEDULE_FAILED
}
from '../../utils/Constant'
import dashboardApi from '../../api/dashboardApi'

function* fetchStatistical(){
    try {
        const response = yield call(dashboardApi.statistical);
        yield put({type: GET_STATISTICAL_SUCCESS, payload: response})
    } catch (error) {
        const data = error.response.data
        message.error(`${data.message}`)
        yield put({type: GET_STATISTICAL_FAILED, payload: error})
    }
}

function* fetchChartSchedule(){
    try {
        const response = yield call(dashboardApi.chartSchedule);
        yield put({type: GET_CHART_SCHEDULE_SUCCESS, payload: response})
    } catch (error) {
        const data = error.response.data
        message.error(`${data.message}`)
        yield put({type: GET_CHART_SCHEDULE_FAILED, payload: error})
    }
}
 
function* dashboardSaga(){
    yield takeLatest(GET_STATISTICAL, fetchStatistical);
    yield takeLatest(GET_CHART_SCHEDULE, fetchChartSchedule);
}
export default dashboardSaga;