import {
    GET_ALL_SCHEDULE,
     
    DELETE_SCHEDULE,
 
    UPDATE_STATUS_SCHEDULE
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
 
export const updateStatusSshedule = (data)=>{
    return {
        type : UPDATE_STATUS_SCHEDULE,
        payload : data
    }
}
 