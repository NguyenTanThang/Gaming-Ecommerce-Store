import {
    USER_LOGIN,
    USER_SIGNUP,
    USER_LOGOUT
} from "../actions/types";

const intialState = {
    jwtToken: localStorage.getItem("jwtToken") || null,
    userID: localStorage.getItem("userID") || null
}

const userReducers = (state = intialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            localStorage.setItem("jwtToken", action.payload.jwtToken);
            localStorage.setItem("userID", action.payload.userID);
            return {
                ...state,
                jwtToken: action.payload.jwtToken,
                    userID: action.payload.userID
            }
            break;
        case USER_LOGOUT:
            localStorage.setItem("jwtToken", null);
            localStorage.setItem("userID", null);
            return {
                ...state,
                jwtToken: null,
                userID: null,
                user: null
            }
            break;
        default:
            return state;
            break;
    }
}

export default userReducers;