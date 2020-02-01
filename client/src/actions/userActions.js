import {
    USER_LOGIN,
    USER_SIGNUP,
    USER_LOGOUT
} from "./types";
import axios from "axios";
import {
    setErrors
} from "./errorActions";

export const userLogout = () => {
    return (dispatch) => {
        dispatch({
            type: USER_LOGOUT
        })
    }
}

export const userLogin = (data) => {
    const {email, password} = data;
    return (dispatch) => {
        axios.post("/users/login", {email, password})
        .then(response => {
            const {token, userID} = response.data;
            if (response.data.messages != undefined){
                dispatch(setErrors(response.data.messages));
            }
            dispatch({
                type: USER_LOGIN,
                payload: {
                    jwtToken: token,
                    userID
                }
            })
        })
    }
}

export const userSignup = (data) => {
    const {username, email, password} = data;
    return (dispatch) => {
        axios.post("/users/signup", {username, email, password})
        .then(response => {
            if (response.data.messages != undefined){
                dispatch(setErrors(response.data.messages));
            }
            dispatch({
                type: USER_SIGNUP,
                payload: {
                    token: ""
                }
            })
        })
    }
}