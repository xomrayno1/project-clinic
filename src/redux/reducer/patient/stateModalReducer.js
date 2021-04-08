import {SET_STATE_MODAL_PATIENT} from '../../../utils/Constant';
const initalState = {
    visible : false,
    viewOnly : false,
    item : null,
    image: null
}
export default function stateModalReducer(state = initalState, action){
    const {type, payload} = action;
    switch (type) {
        case SET_STATE_MODAL_PATIENT:
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }

}