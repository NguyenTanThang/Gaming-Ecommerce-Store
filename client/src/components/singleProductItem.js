import React, {Component}  from "react";
import {
    getProduct
} from "../actions/productActions";
import {
    addToCart
} from "../actions/cartActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class SingleProductItem extends Component{
    componentDidMount(){
        this.props.getProduct(this.props.match.params.id);
    }

    onAddToCart = () => {
        this.props.addToCart(this.props.productItem);
    }

    render(){
        if (this.props.loading){
            return(
                <div className="container section-padding">
                    <div className="row">
                        <div className="m-auto col-6 text-center">
                            <img alt="Loading"
                            className="img-fluid"
                            src="/img/loading-gif.gif"/>
                        </div>
                    </div>
                </div>
            )
        } else {
            const {_id, productName, productPrice, productDescription, productImgURL} = this.props.productItem;
            return(
                <div className="container section-padding">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 text-center">
                            <img src={productImgURL} 
                            alt={productName}
                            className="img-fluid" />
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <h4><b>Name: </b>{productName}</h4>
                            <h4><b>Price: </b>{productPrice}</h4>
                            <p>{productDescription}</p>
                            <ul className="d-flex">
                                <li>
                                    <Link to="/" className="btn btn-light">Go Back</Link>
                                </li>
                                <li>
                                    <button onClick={this.onAddToCart} className="btn btn-primary ml-2">Add To Cart</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        productItem: state.productReducers.productItem,
        loading: state.loadingReducers.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProduct: (id) => dispatch(getProduct(id)),
        addToCart: (cartItem) => dispatch(addToCart(cartItem))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductItem);