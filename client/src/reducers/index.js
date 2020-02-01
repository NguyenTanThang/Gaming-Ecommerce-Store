import {combineReducers} from "redux";

// Reducers
import productReducers from "./productReducers";
import loadingReducers from "./loadingReducers";
import cartReducers from "./cartReducers";
import errorReducers from "./errorReducers";
import userReducers from "./userReducers";

const rootReducers = combineReducers({
    productReducers,
    loadingReducers,
    cartReducers,
    errorReducers,
    userReducers
})

export default rootReducers;