import {
    GET_ALL_USER,
    UPDATE_USER,
    SET_STATE_MODAL_USER,
    DELETE_USER,
    RESTORE_USER,
    CREATE_USER
}
    from '../../utils/Constant'

export const fetchUser = (data)=>{
    return {
        type : GET_ALL_USER,
        payload : data
    }
}

export const deleteUser = (data)=>{
    return {
        type : DELETE_USER,
        payload : data
    }
}

export const restoreUser = (data)=>{
    return {
        type : RESTORE_USER,
        payload : data
    }
}
export const updateUser = (data) =>{
    return {
        type: UPDATE_USER,
        payload: data
    }
}
export const createUser = (data) =>{
    return {
        type: CREATE_USER,
        payload: data
    }
}
export const setStateModal = (data) =>{
    return {
        type: SET_STATE_MODAL_USER,
        payload : data
    }
}