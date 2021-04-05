import {all} from 'redux-saga/effects' 
import doctorSaga from '../sagas/doctorSaga'
 

export default function* rootSaga(){
   yield all([
        doctorSaga()
   ]) 
}