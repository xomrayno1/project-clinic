import {
    FETCH_BOOKING,
    CANCEL_BOOKING,
    CREATE_BOOKING
}
    from '../../utils/Constant'

export const fetchBooking = (data)=>{
    return {
        type : FETCH_BOOKING,
        payload : data
    }
}
export const createBooking = (data,history)=>{
    return {
        type : CREATE_BOOKING,
        payload : data,
        history : history
    }
}
export const cancelBooking = (data)=>{
    return {
        type : CANCEL_BOOKING,
        payload : data
    }
}
 