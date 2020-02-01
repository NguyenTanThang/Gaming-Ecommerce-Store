import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    ADD_BY_ONE_TO_CART,
    REDUCE_BY_ONE_FROM_CART,
    CLEAR_CART
} from "./types";
import {
    setLoading,
    clearLoading
} from "./loadingActions";

export const clearCart = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_CART
        })
    }
}

export const reduceByOneFromCart = (cartItem) => {
    return (dispatch) => {
        dispatch({
            type: REDUCE_BY_ONE_FROM_CART,
            payload: {
                cartItem
            }
        })
    }
}

export const addByOneToCart = (cartItem) => {
    return (dispatch) => {
        dispatch({
            type: ADD_BY_ONE_TO_CART,
            payload: {
                cartItem
            }
        })
    }
}

export const removeFromCart = (cartItem) => {
    return (dispatch) => {
        dispatch({
            type: REMOVE_FROM_CART,
            payload: {
                cartItem
            }
        })
    }
}

export const addToCart = (cartItem) => {
    if (cartItem.quantity == undefined){
        cartItem.quantity = 1;
        cartItem.subTotal = cartItem.productPrice;
    } 

    return (dispatch) => {
        dispatch({
            type: ADD_TO_CART,
            payload: {
                cartItem
            }
        })
    }
}