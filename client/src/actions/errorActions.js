import {
    SET_ERRORS,
    CLEAR_ERRORS
} from "./types";

export const setErrors = (messages) => {
    return (dispatch) => {
        dispatch({
            type: SET_ERRORS,
            payload: {messages}
        })
    }
}

export const clearErrors = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_ERRORS
        })
    }
}