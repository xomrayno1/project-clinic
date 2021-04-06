import {SET_STATE_MODAL_DOCTOR} from '../../../utils/Constant';
const initalState = {
    visible : false,
    viewOnly : false,
    image : null,
    item : null
}
export default function stateModalReducer(state = initalState, action){
    const {type, payload} = action;
    switch (type) {
        case SET_STATE_MODAL_DOCTOR:
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }

}