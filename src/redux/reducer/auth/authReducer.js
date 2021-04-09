import {
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILED,
    AUTH_LOGIN,
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILED,
    AUTH_LOGOUT
} from '../../../utils/Constant'

const initalState = {
    isLoading : false,
    isLogin : false,
    user : {
        username : '',
        roles : [],
    },
    error : ''
}
const  getAuthState = () => {
    console.log("authh");
    const auth = localStorage.getItem("auth");
    try {
        const authObject = JSON.parse(auth);
         
        if(authObject){
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
                    roles : payload.roles,
                },
                isLogin : true
                
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
                isLoading : false,
                isLogin : false,
                user : {
                    username : '',
                    roles : [],
                    jwt : '',
                },
                error : ''
            }
        default:
            return state;
    }
}
export default authReducer;