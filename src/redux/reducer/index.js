import {combineReducers} from 'redux'
import doctorReducer from '../reducer/doctor/doctorReducer'
import stateDoctorModalReducer from  '../reducer/doctor/stateModalReducer'
import patientReducer from '../reducer/patient/patientReducer'
import statePatientModalReducer from '../reducer/patient/stateModalReducer'
import userReducer from '../reducer/user/userReducer'
import stateUserModalReducer from '../reducer/user/stateModalReducer'

const rootReducer = combineReducers({
    doctor: doctorReducer,
    stateDoctorModal: stateDoctorModalReducer,
    patient: patientReducer,
    statePatientModal: statePatientModalReducer,
    user: userReducer,
    stateUserModal : stateUserModalReducer
})
export default rootReducer;