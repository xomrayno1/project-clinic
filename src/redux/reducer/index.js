import {combineReducers} from 'redux'
import doctorReducer from '../reducer/doctor/doctorReducer'
import stateDoctorModalReducer from  '../reducer/doctor/stateModalReducer'
import patientReducer from '../reducer/patient/patientReducer'
import statePatientModalReducer from '../reducer/patient/stateModalReducer'

const rootReducer = combineReducers({
    doctor: doctorReducer,
    stateDoctorModal: stateDoctorModalReducer,
    patient: patientReducer,
    statePatientModal: statePatientModalReducer
})
export default rootReducer;