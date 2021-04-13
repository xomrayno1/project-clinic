import {
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILED,
    AUTH_LOGIN,
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILED,
    AUTH_LOGOUT,

    //profile
    GET_DOCTOR_BY_USER,
    GET_DOCTOR_BY_USER_SUCCESS,
    GET_DOCTOR_BY_USER_FAILED,
    GET_PATIENT_BY_USER,
    GET_PATIENT_BY_USER_SUCCESS,
    GET_PATIENT_BY_USER_FAILED,

    UPDATE_PROFILE_DOCTOR,
    UPDATE_PROFILE_DOCTOR_SUCCESS,
    UPDATE_PROFILE_DOCTOR_FAILED,
    UPDATE_PROFILE_PATIENT_SUCCESS,
    UPDATE_PROFILE_PATIENT_FAILED,
    UPDATE_PROFILE_PATIENT
} from '../../../utils/Constant'

const initalState = {
    isLoading: false,
    isLogin: false,
    user: {
        username: '',
        roles: [],
        id: ''
    },
    profile: '',
    error: ''
}
const getAuthState = () => {

    const auth = localStorage.getItem("auth");
    try {
        const authObject = JSON.parse(auth);

        if (authObject) {
            // const {isLogin,username,roles} = authObject;
            // return {
            //     isLoading : false,
            //     isLogin : isLogin,
            //     user : {
            //         username : username,
            //         roles : [...roles],
            //     },
            //     error : ''
            // };
            return authObject
        }
        return initalState
    } catch (error) {
        return initalState;
    }
}
const newsState = getAuthState();

function authReducer(state = newsState, action) {
    const { type, payload } = action;
    switch (type) {
        case AUTH_LOGIN:
            return {
                ...state,
                isLoading: true
            }
        case AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: {
                    username: payload.username,
                    roles: payload.roles,
                    id: payload.id
                },
                isLogin: true

            }
        case AUTH_LOGIN_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case AUTH_REGISTER:
            return {
                ...state,
                isLoading: true
            }
        case AUTH_REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
            }
        case AUTH_REGISTER_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case AUTH_LOGOUT:
            return {
                isLoading: false,
                isLogin: false,
                user: {
                    username: '',
                    roles: [],
                    jwt: '',
                    id: ''
                },
                error: ''
            }
        case GET_DOCTOR_BY_USER:
            return {
                ...state,
                isLoading: true
            }
        case GET_DOCTOR_BY_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                profile: payload
            }
        case GET_DOCTOR_BY_USER_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case GET_PATIENT_BY_USER:
            return {
                ...state,
                isLoading: true
            }
        case GET_PATIENT_BY_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                profile: payload
            }
        case GET_PATIENT_BY_USER_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case UPDATE_PROFILE_DOCTOR:
            return {
                ...state,
                isLoading: true
            }
        case UPDATE_PROFILE_DOCTOR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                profile: payload
            }
        case UPDATE_PROFILE_DOCTOR_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case UPDATE_PROFILE_PATIENT:
            return {
                ...state,
                isLoading: true
            }
        case UPDATE_PROFILE_PATIENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                profile: payload
            }
        case UPDATE_PROFILE_PATIENT_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        default:
            return state;
    }
}
export default authReducer;