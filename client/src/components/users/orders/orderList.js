import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import OrderItem from "./orderItem";
import {connect} from "react-redux";
import {
    setLoading,
    clearLoading
} from "../../../actions/loadingActions";

class OrderList extends Component{

    constructor(props){
        super(props);
        this.state = {
            orderItems: []
        }
    }

    componentDidMount(){
        axios.get("/orders/all/" + this.props.userID)
        .then(response => {
            console.log(response);
            this.setState({
                orderItems: response.data.orders
            })
        })
    }
    
    render(){
         
        const orders = this.state.orderItems.map((orderItem, index) => {
            return <OrderItem key={index} index={index+1} orderItem={orderItem} />
        })
        
        return (
            <div className="container">
                <div className="row">
                    {orders}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userID: state.userReducers.userID
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoading: () => dispatch(setLoading()),
        clearLoading: () => dispatch(clearLoading()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderList);