import {
    GET_ALL_SCHEDULE,
     
    DELETE_SCHEDULE,
    
    CREATE_SCHEDULE
}
    from '../../utils/Constant'

export const fetchSchedule = (data)=>{
    return {
        type : GET_ALL_SCHEDULE,
        payload : data
    }
}

export const deleteSchedule = (data)=>{
    return {
        type : DELETE_SCHEDULE,
        payload : data
    }
}
 
export const createSchedule = (data) =>{
    return {
        type: CREATE_SCHEDULE,
        payload: data
    }
}
 