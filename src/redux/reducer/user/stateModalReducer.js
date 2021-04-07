import {SET_STATE_MODAL_USER} from '../../../utils/Constant';
const initalState = {
    visible : false,
    viewOnly : false,
    item : null
}
export default function stateModalReducer(state = initalState, action){
    const {type, payload} = action;
    switch (type) {
        case SET_STATE_MODAL_USER:
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }

}