import {combineReducers} from 'redux'
import doctorReducer from '../reducer/doctorReducer'

const rootReducer = combineReducers({
    doctor: doctorReducer
})
export default rootReducer;