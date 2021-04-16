import {all} from 'redux-saga/effects' 
import doctorSaga from '../sagas/doctorSaga'
import patientSaga from '../sagas/patientSaga'
import userSaga from '../sagas/userSaga'
import scheduleSaga from './scheduleSaga'
import authSaga from './authSaga'
import bookingSaga from './bookingSaga'
import resultSaga from './resultSaga'
import notificationSaga from './notificationSaga'
export default function* rootSaga(){
   yield all([
        doctorSaga(),
        patientSaga(),
        userSaga(),
        scheduleSaga(),
        authSaga(),
        bookingSaga(),
        resultSaga(),
        notificationSaga()
   ]) 
}