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
    CREATE_SCHEDULE_FAILED,
    UPDATE_STATUS_SCHEDULE,
    UPDATE_STATUS_SCHEDULE_SUCCESS,
    UPDATE_STATUS_SCHEDULE_FAILED
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
function* updateStatusSchedule({payload}){ // ref get data add
    try {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const {jwt,id} = auth.user;
        yield call(scheduleApi.updateStatus,payload);
        const response = yield call(scheduleApi.getAllFilterPagination,{
            dateFrom: "",
            dateTo: "",
            key: "doctor",
            keyId: id,
            keySearch: "",
            limit: 5,
            page: 1,
        });
        yield put({type: UPDATE_STATUS_SCHEDULE_SUCCESS, payload: response})
        message.success("Cập nhật thành công");
    } catch (error) { // ref set
        const data = error.response.data
        message.error(`  ${data.message}`)
        yield put({type: UPDATE_STATUS_SCHEDULE_FAILED, payload: error})
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
    yield takeLatest(UPDATE_STATUS_SCHEDULE, updateStatusSchedule)
}
export default scheduleSaga;

 