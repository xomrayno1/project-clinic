import {
    FETCH_NOTIFICATION,
    UPDATE_SEEN,

}
    from '../../utils/Constant'

export const fetchAction = () => {
    return {
        type: FETCH_NOTIFICATION,
    }
}

export const updateSeenAction = (data) => {
    return {
        type: UPDATE_SEEN,
        payload: data
    }
}

