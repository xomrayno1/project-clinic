import {takeLatest, put, call} from 'redux-saga/effects'
import {message} from 'antd'

import {
    FETCH_BOOKING,
    FETCH_BOOKING_SUCCESS,
    FETCH_BOOKING_FAILED,
    CANCEL_BOOKING,
    CANCEL_BOOKING_SUCCESS,
    CANCEL_BOOKING_FAILED,
    CREATE_BOOKING,
    CREATE_BOOKING_SUCCESS,
    CREATE_BOOKING_FAILED
}
from '../../utils/Constant'
import scheduleApi from '../../api/scheduleApi'
import bookingApi from '../../api/bookingApi'
 

function* fetchBooking({payload}){
    try {
        const response = yield call(scheduleApi.getAllFilterPagination,payload);
        yield put({type: FETCH_BOOKING_SUCCESS, payload: response})
    } catch (error) {
        message.error(` Tải thất bại`)
        yield put({type: FETCH_BOOKING_FAILED, payload: error})
    }
}
function* cancelBooking({payload}){ // ref get data add
    try {
        const auth =  JSON.parse(localStorage.getItem('auth'));
        const {jwt,id} = auth.user;
        yield call(bookingApi.bookingCancel,payload);
        const response = yield call(scheduleApi.getAllFilterPagination,{
            keySearch : '',
            dateTo : '',
            dateFrom: '',
            page : 1,
            limit: 5,
            key: 'patient',
            keyId: id
        });
        yield put({type: CANCEL_BOOKING_SUCCESS, payload: response})
        message.success("Hủy thành công")
    } catch (error) { // ref set
        message.error(error.response.data.message);
        yield put({type: CANCEL_BOOKING_FAILED, payload: error})
    }
}
function* createBooking({payload, history}){
    try {
        console.log(payload)
        yield call(bookingApi.createBooking,payload);
        yield put({type: CREATE_BOOKING_SUCCESS})
        history.push("/admin/list-booking")
        message.success("Đặt thành công")
    } catch (error) {
        const {code} = error.response.data;
        switch(code){
            case 350:
                message.error(error.response.data.message)
                break;
            case 400:
                message.error(error.response.data.message)
                break;
            default:
                message.error("Đặt thất bại")
        }
  
        yield put({type: CREATE_BOOKING_FAILED, payload: error})
    }
}
 
function* scheduleSaga(){
    yield takeLatest(FETCH_BOOKING, fetchBooking)
    yield takeLatest(CANCEL_BOOKING, cancelBooking)
    yield takeLatest(CREATE_BOOKING, createBooking)
}
export default scheduleSaga;