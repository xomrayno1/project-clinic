import {takeLatest, put, call} from 'redux-saga/effects'
import {message,  } from 'antd'
 
import {
    GET_ALL_USER_FAILED,
    GET_ALL_USER,
    GET_ALL_USER_SUCCESS,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,
    GET_USER,
    GET_USER_FAILED,
    GET_USER_SUCCESS,
    DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILED,
    RESTORE_USER,
    CREATE_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILED,
    GET_DOCTOR_BY_USER,
    GET_DOCTOR_BY_USER_SUCCESS,
    GET_DOCTOR_BY_USER_FAILED,
    GET_PATIENT_BY_USER,
    GET_PATIENT_BY_USER_SUCCESS,
    GET_PATIENT_BY_USER_FAILED,
    UPDATE_PROFILE_DOCTOR,
    UPDATE_PROFILE_DOCTOR_SUCCESS,
    UPDATE_PROFILE_DOCTOR_FAILED,
    UPDATE_PROFILE_PATIENT,
    UPDATE_PROFILE_PATIENT_FAILED,
    UPDATE_PROFILE_PATIENT_SUCCESS,
    SET_MODAL_INFO_USER,
    SET_MODAL_INFO_USER_SUCCESS,
    SET_MODAL_INFO_USER_FAILED,
    UPDATE_USER_INFO,
    UPDATE_USER_INFO_SUCCESS,
    UPDATE_USER_INFO_FAILED
}
from '../../utils/Constant'
import userApi from '../../api/userApi'

import {defaultFilter} from '../../utils/AppUtils'


function* fetchUser({payload}){
    try {
        const response = yield call(userApi.getAllFilter,payload);
        yield put({type: GET_ALL_USER_SUCCESS, payload: response})
    } catch (error) {
        const data = error.response.data
        message.error(`  ${data.message}`)
        yield put({type: GET_ALL_USER_FAILED, payload: error})
    }
}
function* updateUser({payload}){
    try { //ref get dataa
        yield call(userApi.update,payload);
        const response = yield call(userApi.getAllFilter,defaultFilter);
        yield put({type: UPDATE_USER_SUCCESS, payload: response})
    } catch (error) { //ref set error
        const data = error.response.data
        message.error(`  ${data.message}`)
        yield put({type: UPDATE_USER_FAILED, payload: error})
    }
}
function* updateProfileDoctor({doctorRef}){
    const current = doctorRef.current;
    console.log(current.values)
    try { //ref get dataa
        const response = yield call(userApi.updateProfileDoctor,current.values);
        yield put({type: UPDATE_PROFILE_DOCTOR_SUCCESS, payload: response})
        message.success(` Cập nhật thành công`)
    } catch (error) { //ref set error
        const data = error.response.data
        yield put({type: UPDATE_PROFILE_DOCTOR_FAILED, payload: data.message})
        switch(data.code){
            case 400:
                const {fieldErrors} = data;
                current.setErrors({
                    ...fieldErrors
                })
                break;
            case 303:
                console.log(303)
                current.setErrors({
                    email: "Email đã tồn tại"
                })
                break;
        }
    }
}
function* updateProfilePatient({patientRef}){
    const current = patientRef.current;
    console.log(current.values)
    try { //ref get dataa
        const response = yield call(userApi.updateProfilePatient,current.values);
        console.log(response)
        yield put({type: UPDATE_PROFILE_PATIENT_SUCCESS, payload: response})
        message.success(` Cập nhật thành công`)
    } catch (error) { //ref set error
        const data = error.response.data
        yield put({type: UPDATE_PROFILE_PATIENT_FAILED, payload: data.message})
        switch(data.code){
            case 400:
                const {fieldErrors} = data;
                current.setErrors({
                    ...fieldErrors
                })
                break;
            case 303:
                console.log(303)
                current.setErrors({
                    email: "Email đã tồn tại"
                })
                break;
        }
    }
}

function* findUserById({payload}){
    try {
        const response = yield call(userApi.findById,payload);
        yield put({type: GET_USER_SUCCESS, payload: response})
    } catch (error) {
        yield put({type: GET_USER_FAILED, payload: error})
    }
}
function* deleteUser({payload}){ // ref get data add
    try {
        yield call(userApi.delete,payload);
        const response = yield call(userApi.getAllFilter,defaultFilter);
        yield put({type: DELETE_USER_SUCCESS, payload: response})
    } catch (error) { // ref set
        const data = error.response.data
        message.error(`  ${data.message}`)
        yield put({type: DELETE_USER_FAILED, payload: error})
    }
}
function* restoreUser({payload}){
    try {
        yield call(userApi.restore,payload);
        const response = yield call(userApi.getAllFilter,defaultFilter);
        yield put({type: GET_ALL_USER_SUCCESS, payload: response})
    } catch (error) {
        const data = error.response.data
        message.error(` ${data.message}`)
        yield put({type: GET_ALL_USER_FAILED, payload: error})
    }
}
function* createUser({payload}){
    try {
        yield call(userApi.create,payload);
        const response = yield call(userApi.getAllFilter,defaultFilter);
        yield put({type: CREATE_USER_SUCCESS, payload: response})
    } catch (error) {
        const data = error.response.data
        message.error(`  ${data.message}`)
        yield put({type: CREATE_USER_FAILED, payload: error})
    }
}
function* fetchDoctorByUser({payload, doctorRef}){
    try {
        const {current} = doctorRef;
        const response = yield call(userApi.findDoctorByUser,payload);
        yield put({type: GET_DOCTOR_BY_USER_SUCCESS, payload: response})
        current.setValues({
            name : response.name,
            email : response.email,
            phone : response.phone,
            domain : response.domain,
            education: response.education,
            gender : response.gender || 'male',
            level : response.level,
            city : response.city,
            address : response.address,
            description : response.description,
            id: response.id,
            userId: response.userId
        })
    } catch (error) {
        // const data = error.response && error.response.data || ''
        message.error(`Tải thất bại`)
        yield put({type: GET_DOCTOR_BY_USER_FAILED, payload: error})
    }
}
function* fetchPatientByUser({patientRef}){
    const {current} = patientRef;
    try {
        const response = yield call(userApi.findPatientByUser);
        yield put({type: GET_PATIENT_BY_USER_SUCCESS, payload: response})
        current.setValues({
            name : response.name,
            email : response.email,
            phone : response.phone,
            gender : response.gender || 'male',
            address : response.address,
            description : response.description,
            id: response.id,
            userId: response.userId
        })
    } catch (error) {
        // const data = error.response.data || null
        // console.log(data)
        message.error(`Tải thất bại`)
        yield put({type: GET_PATIENT_BY_USER_FAILED, payload: error})
    }
}

//not reducer
function* setModalInfo({payload,    formInfoRef}){
    try {
        const response = yield call(userApi.findById,payload);
        formInfoRef.current.setValues({
                username: response.username,
                password: response.password,
                email : response.email,
                id: response.id,
                roles : response.roles
             })
    } catch (error) {
        message.error(`Tải thất bại `)
    }
}
function* updateModalInfo({formInfoRef, setModal}){
    try {
        //modalRef.current.className = "modal fade"
        //modalRef.current.isOpen(false)
        
        const response = yield call(userApi.update,formInfoRef.current.values);
        message.success("Update thành công");
        setModal(false)
    } catch (error) {
        const code = error.response.data.code;
         
        if(code === 303){
            formInfoRef.current.setErrors({
                email: "Email đã tồn tại"
            })
        }else{
            formInfoRef.current.setErrors({
                email: "Cập nhật thất bại"
            })
            
        }
    }
}

function* userSaga(){
    yield takeLatest(GET_ALL_USER, fetchUser)
    yield takeLatest(UPDATE_USER, updateUser)
    yield takeLatest(GET_USER, findUserById)
    yield takeLatest(DELETE_USER, deleteUser)
    yield takeLatest(RESTORE_USER, restoreUser)
    yield takeLatest(CREATE_USER, createUser)
    yield takeLatest(GET_DOCTOR_BY_USER, fetchDoctorByUser)
    yield takeLatest(GET_PATIENT_BY_USER, fetchPatientByUser)
    yield takeLatest(UPDATE_PROFILE_DOCTOR, updateProfileDoctor)
    yield takeLatest(UPDATE_PROFILE_PATIENT, updateProfilePatient)
    yield takeLatest(SET_MODAL_INFO_USER, setModalInfo)
    yield takeLatest(UPDATE_USER_INFO, updateModalInfo)
}
export default userSaga;