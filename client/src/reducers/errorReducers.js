import {
    SET_ERRORS,
    CLEAR_ERRORS
} from "../actions/types";

const initialState = {
    messages: []
}

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                messages: action.payload.messages
            }
            break;
        case CLEAR_ERRORS:
            return {
                ...state,
                messages: []
            }
        default:
            return state
            break;
    }
}

export default errorReducer;