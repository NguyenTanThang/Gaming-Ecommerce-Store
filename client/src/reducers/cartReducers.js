import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    ADD_BY_ONE_TO_CART,
    REDUCE_BY_ONE_FROM_CART,
    CLEAR_CART
} from "../actions/types";

const initialState = {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    cartItem: {},
    totalQuantity: parseInt(localStorage.getItem("totalQuantity")) || 0,
    totalPrice: parseFloat(localStorage.getItem("totalPrice")) || 0
}

const isUnique = (array, item) => {
    let tof = true;
    array.forEach(arrayItem => {
        if (arrayItem._id === item._id && arrayItem != null) {
            tof = false;
        }
    })
    return tof;
}

let productPrice = 0;
let subTotal = 0;
let quantity = 0;
let currentState = {};

const cartReducers = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_CART:
            localStorage.setItem("cartItems", null);
            localStorage.setItem("totalQuantity", null);
            localStorage.setItem("totalPrice", null);
            return {
                ...state,
                cartItems: [],
                totalQuantity: 0,
                totalPrice: 0,
                cartItem: {}
            }
            break;
        case ADD_TO_CART:
            if (!isUnique(state.cartItems, action.payload.cartItem)) {
                currentState = {
                    ...state,
                    cartItems: state.cartItems.filter(item => {
                        if (item == null) return false;
                        return true;
                    }).map(cartItem => {
                        if (cartItem._id === action.payload.cartItem._id) {
                            cartItem.quantity = cartItem.quantity + 1;
                            cartItem.subTotal =
                                cartItem.subTotal + cartItem.productPrice
                        }
                        return cartItem;
                    }),
                    totalQuantity: state.totalQuantity + 1,
                    totalPrice: state.totalPrice + action.payload.cartItem.productPrice
                };
                localStorage.setItem("cartItems", JSON.stringify(currentState.cartItems));
                localStorage.setItem("totalQuantity", currentState.totalQuantity);
                localStorage.setItem("totalPrice", currentState.totalPrice);
                return currentState;
            } else {
                currentState = {
                    ...state,
                    cartItems: [
                        ...state.cartItems,
                        action.payload.cartItem
                    ],
                    totalQuantity: state.totalQuantity + 1,
                    totalPrice: state.totalPrice + action.payload.cartItem.productPrice
                }
                localStorage.setItem("cartItems", JSON.stringify(currentState.cartItems));
                localStorage.setItem("totalQuantity", currentState.totalQuantity);
                localStorage.setItem("totalPrice", currentState.totalPrice);
                return currentState;
            }
            break;
        case REMOVE_FROM_CART:
            subTotal = 0;
            quantity = 0;
            currentState = {
                ...state,
                cartItems: state.cartItems.filter(item => {
                    if (item == null) return false;
                    return true;
                }).filter(cartItem => {
                    if (cartItem._id !== action.payload.cartItem._id && cartItem != null) {
                        return cartItem;
                    } else {
                        quantity = cartItem.quantity;
                        subTotal = cartItem.subTotal;
                    }
                }),
                totalQuantity: state.totalQuantity - quantity,
                totalPrice: state.totalPrice - subTotal
            }
            localStorage.setItem("cartItems", JSON.stringify(currentState.cartItems));
            localStorage.setItem("totalQuantity", currentState.totalQuantity);
            localStorage.setItem("totalPrice", currentState.totalPrice);
            return currentState;
            break;
        case ADD_BY_ONE_TO_CART:
            productPrice = 0;
            currentState = {
                ...state,
                cartItems: state.cartItems.filter(item => {
                    if (item == null) return false;
                    return true;
                }).map(cartItem => {
                    if (cartItem._id === action.payload.cartItem._id && cartItem != null) {
                        cartItem.quantity = cartItem.quantity + 1;
                        cartItem.subTotal =
                            cartItem.subTotal + cartItem.productPrice
                        productPrice = cartItem.productPrice;
                    }
                    return cartItem;
                }),
                totalQuantity: state.totalQuantity + 1,
                totalPrice: state.totalPrice + productPrice
            };
            localStorage.setItem("cartItems", JSON.stringify(currentState.cartItems));
            localStorage.setItem("totalQuantity", currentState.totalQuantity);
            localStorage.setItem("totalPrice", currentState.totalPrice);
            return currentState;
            break;
        case REDUCE_BY_ONE_FROM_CART:
            productPrice = 0;
            currentState = {
                ...state,
                cartItems: state.cartItems.filter(item => {
                    if (item == null) return false;
                    return true;
                }).map(cartItem => {
                    if (cartItem._id === action.payload.cartItem._id && cartItem != null) {
                        cartItem.quantity = cartItem.quantity - 1;
                        cartItem.subTotal =
                            cartItem.subTotal - cartItem.productPrice
                        productPrice = cartItem.productPrice;
                    }
                    if (cartItem.quantity > 0) {
                        return cartItem;
                    }
                }),
                totalQuantity: state.totalQuantity - 1,
                totalPrice: state.totalPrice - productPrice
            };
            localStorage.setItem("cartItems", JSON.stringify(currentState.cartItems));
            localStorage.setItem("totalQuantity", currentState.totalQuantity);
            localStorage.setItem("totalPrice", currentState.totalPrice);
            return currentState;
            break;
        default:
            return state;
            break;
    }
}

export default cartReducers;