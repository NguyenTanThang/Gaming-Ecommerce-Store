import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {
    setLoading,
    clearLoading
} from "../../../actions/loadingActions";
import {connect} from "react-redux";

class OrderDetailItem extends Component{
    render(){
        const {_id, productName, productImgURL, productPrice, quantity, subTotal} = this.props.orderDetailItem;
        return (
            <tr>
                <td>
                    <Link to={`/products/${_id}`}>
                        {productName}
                    </Link>
                </td>
                <td>
                    <img className="cart-product-img img-fluid" alt={productName} 
                    src={productImgURL}/>
                </td>
                <td>
                    {productPrice}$
                </td>
                <td>
                    {quantity}
                </td>
                <td>
                    {subTotal}$
                </td>
            </tr>
        )
    }
}


class OrderDetail extends Component{
    constructor(props){
        super(props);

        this.state = {
            orderItem: {},
            items: [],
            total: 0
        }
    }

    componentWillMount(){
        console.log(this.props.match.params.id);
        this.props.setLoading();
        axios.get("/orders/" + this.props.match.params.id)
        .then(response => {
            console.log(response);
            console.log(response.data.order);
            this.setState({
                orderItem: response.data.order,
                items: response.data.order.items,
                total: response.data.order.total
            }, () => {
                this.props.clearLoading();
            })
        })
    }

    render(){
        if (this.props.loading){
            return(
                <div className="container">
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
            return (
                <div className="container">
                    <table className="table table-hovered table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Sub-Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.items.map(orderDetailItem => {
                                    return <OrderDetailItem key={orderDetailItem._id} orderDetailItem={orderDetailItem}/>
                            })}
                            <tr>
                                <td colSpan="4" className="text-right"><b>Total</b></td>
                                <td>{this.state.total}$</td>
                            </tr>
                        </tbody>
                    </table>
                    <ul className="d-flex">
                        <li>
                            <Link className="ml-2 btn btn-light" to="/users/profile">
                                Back
                            </Link>
                        </li>
                    </ul>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loadingReducers.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoading: () => dispatch(setLoading()),
        clearLoading: () => dispatch(clearLoading())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);