import React, {Component} from "react";
import {Link} from "react-router-dom";

class OrderItem extends Component{
    
    render(){
        const {total, _id} = this.props.orderItem;
        const {index} = this.props;
        return (
            <div className="col-lg-3 col-md-6 col-sm-12 order-item">
                <div className="card">
                    <div className="card-body">
                    <h5 className="card-title">Order {index}</h5>
                    <p className="card-text">
                        <strong>Total: </strong>{total}
                    </p>
                    <Link to={`/orders/${_id}`} className="btn btn-primary">View Order Detail</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderItem;