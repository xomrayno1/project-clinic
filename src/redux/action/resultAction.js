import {
    SAVE_RESULT,
    FETCH_RESULT,
    UPDATE_RESULT,
    GET_RESULT_BY_SCHEDULE,
    SET_MODAL_RESULT
} from '../../utils/Constant'

export const addResult = (data, addRef,setModalResult)=>{
    return {
        type : SAVE_RESULT,
        payload : data,
        addRef,
        setModalResult,
    
    }
}
export const fetchResult = (data)=>{
    return {
        type : FETCH_RESULT,
        payload : data,
    }
}
export const getResultBySchedule = (data)=>{
    return {
        type : GET_RESULT_BY_SCHEDULE,
        payload : data,
    }
}

export const updateResult = (data, addRef) => {
    return {
        type : UPDATE_RESULT,
        payload : data,
        addRef
    }
}

export const setDataModalResult = (data, addRef) => {
    return {
        type : SET_MODAL_RESULT,
        payload : data,
        addRef,
       
    }
}

