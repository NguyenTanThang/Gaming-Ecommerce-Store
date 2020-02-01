import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {
    addToCart
} from "../actions/cartActions";

class ProductItem extends Component{

    constructor(props){
        super(props);
    }

    onAddToCart = () => {
        this.props.addToCart(this.props.productItem);
    }

    render(){
        const {_id, productName, productPrice, productImgURL} = this.props.productItem
        return(
            <div className="col-lg-4 col-md-6 col-sm-12 product-item">
                <div className="card" style={{width: "18rem"}}>
                    <img className="card-img-top" src={productImgURL} alt={productName}/>
                    <div className="card-body">
                        <h5 className="card-title">{productName}</h5>
                        <p className="card-text">
                            <b>Price: </b> {productPrice}$
                        </p>
                        <Link to={`/products/${_id}`} className="btn btn-light">View Detail</Link>
                        <button className="ml-2 btn btn-primary" onClick={this.onAddToCart}>Add To Cart</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.cartReducers.cartItems
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (cartItem) => dispatch(addToCart(cartItem))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);