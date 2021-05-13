import {
    GET_STATISTICAL,
    GET_CHART_SCHEDULE
}
    from '../../utils/Constant'

export const getStatistical = ()=>{
    return {
        type : GET_STATISTICAL,
        payload : ''
    }
}
export const getChartSchedule = ()=>{
    return {
        type : GET_CHART_SCHEDULE,
        payload : ''
    }
}
 