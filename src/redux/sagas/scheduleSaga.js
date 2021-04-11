import {takeLatest, put, call} from 'redux-saga/effects'
import {message} from 'antd'

import {
    GET_ALL_SCHEDULE,
    GET_ALL_SCHEDULE_SUCCESS,
    GET_ALL_SCHEDULE_FAILED,
    DELETE_SCHEDULE,
    DELETE_SCHEDULE_SUCCESS,
    DELETE_SCHEDULE_FAILED,
    CREATE_SCHEDULE,
    CREATE_SCHEDULE_SUCCESS,
    CREATE_SCHEDULE_FAILED
}
from '../../utils/Constant'
import scheduleApi from '../../api/scheduleApi'
import {defaultScheduleFilter} from '../../utils/AppUtils'


function* fetchSchedule({payload}){
    try {
        const response = yield call(scheduleApi.getAllFilterPagination,payload);
        yield put({type: GET_ALL_SCHEDULE_SUCCESS, payload: response})
    } catch (error) {
        const data = error.response.data
        message.error(`  ${data.message}`)
        yield put({type: GET_ALL_SCHEDULE_FAILED, payload: error})
    }
}
 
  
function* deleteSchedule({payload}){ // ref get data add
    try {
        yield call(scheduleApi.delete,payload);
        const response = yield call(scheduleApi.getAllFilterPagination,defaultScheduleFilter);
        yield put({type: DELETE_SCHEDULE_SUCCESS, payload: response})
    } catch (error) { // ref set
        const data = error.response.data
        message.error(`  ${data.message}`)
        yield put({type: DELETE_SCHEDULE_FAILED, payload: error})
    }
}
 
function* scheduleSaga(){
    yield takeLatest(GET_ALL_SCHEDULE, fetchSchedule)
    yield takeLatest(DELETE_SCHEDULE, deleteSchedule)
}
export default scheduleSaga;