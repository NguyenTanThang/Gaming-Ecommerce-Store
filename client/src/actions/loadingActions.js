import {
    SET_LOADING,
    CLEAR_LOADING
} from "./types";

export const setLoading = () => {
    return (dispatch) => {
        dispatch({
            type: SET_LOADING
        })
    }
}

export const clearLoading = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_LOADING
        })
    }
}