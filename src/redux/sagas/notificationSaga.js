import {
    put,
    takeLatest,
    call
} from 'redux-saga/effects'

import {
    FETCH_NOTIFICATION,
    FETCH_NOTIFICATION_SUCCESS,
    FETCH_NOTIFICATION_FAILED,
    UPDATE_SEEN,
    UPDATE_SEEN_SUCCESS,
    UPDATE_SEEN_FAILED,
} from '../../utils/Constant'

import notificationApi from '../../api/notificationApi'

//worker
function* fetchSaga(){
    try {
        const response = yield call(notificationApi.getAll);
        yield put({type: FETCH_NOTIFICATION_SUCCESS, payload: response})
    } catch (error) {
        yield put({type: FETCH_NOTIFICATION_FAILED, payload: error.response.data.message})
    }
}
function* updateSeen({payload}){
    try {
         yield call(notificationApi.updateSeen, payload);
         const response = yield call(notificationApi.getAll);
        yield put({type: UPDATE_SEEN_SUCCESS, payload: response})
    } catch (error) {
        yield put({type: UPDATE_SEEN_FAILED, payload: error.response.data.message})
    }
}
export default function* notificationSaga(){
    yield takeLatest(FETCH_NOTIFICATION,fetchSaga )
    yield takeLatest(UPDATE_SEEN,updateSeen )
}
//watcher