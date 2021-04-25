import {combineReducers} from 'redux'
import doctorReducer from '../reducer/doctor/doctorReducer'
import stateDoctorModalReducer from  '../reducer/doctor/stateModalReducer'
import patientReducer from '../reducer/patient/patientReducer'
import statePatientModalReducer from '../reducer/patient/stateModalReducer'
import userReducer from '../reducer/user/userReducer'
import stateUserModalReducer from '../reducer/user/stateModalReducer'
import scheduleReducer from '../reducer/schedule/scheduleReducer'
import authReducer from '../reducer/auth/authReducer'
import bookingReducer from '../reducer/booking/bookingReducer'
import resultReducer from '../reducer/result/resultReducer'
import notificationReducer from '../reducer/noti/notificationReducer.js'
import statisticalReducer from '../reducer/statistical/statisticalReducer'
const rootReducer = combineReducers({
    doctor: doctorReducer,
    stateDoctorModal: stateDoctorModalReducer,
    patient: patientReducer,
    statePatientModal: statePatientModalReducer,
    user: userReducer,
    stateUserModal : stateUserModalReducer,
    schedule : scheduleReducer,
    auth : authReducer,
    booking: bookingReducer,
    result : resultReducer,
    notification: notificationReducer,
    statistical: statisticalReducer
})
export default rootReducer;