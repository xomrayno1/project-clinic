import {all} from 'redux-saga/effects' 
import doctorSaga from '../sagas/doctorSaga'
import patientSaga from '../sagas/patientSaga'

export default function* rootSaga(){
   yield all([
        doctorSaga(),
        patientSaga()
   ]) 
}