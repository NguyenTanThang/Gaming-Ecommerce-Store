import React, {Component} from "react";
import {connect} from "react-redux";
import CartItem from "./cartItem";
import {Link} from "react-router-dom";

class Cart extends Component{

    render(){
        if (this.props.cartItems.length == 0){
            return (
                <div className="container text-center  section-padding">
                    <h1>You currently has no item in cart</h1>
                    <Link to="/" className="mt-4 btn btn-lg btn-primary">
                        Continue Shopping
                    </Link>
                </div>
            )
        }
        return (
            <div className="container section-padding">
                <table className="table table-hovered table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Sub-Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.cartItems.map(cartItem => {
                            if (cartItem == null){
                                return (<span></span>);
                            } else {
                                return <CartItem key={cartItem._id} cartItem={cartItem}/>
                            }
                        })}
                        <tr>
                            <td colSpan="5" className="text-right"><b>Total</b></td>
                            <td>{this.props.totalPrice}$</td>
                        </tr>
                    </tbody>
                </table>
                <ul className="d-flex">
                    <li>
                        <Link className="btn btn-primary" to="/checkout">
                            Checkout
                        </Link>
                    </li>
                    <li>
                        <Link className="ml-2 btn btn-light" to="/">
                            Continue Shopping
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.cartReducers.cartItems,
        totalPrice: state.cartReducers.totalPrice
    }
}

export default connect(mapStateToProps)(Cart);