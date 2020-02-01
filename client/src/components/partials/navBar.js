import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {isNull} from "../../validator/validator";

class Navbar extends Component{
    render(){
        const cartQuantityLabel = this.props.totalQuantity > 0 ?
        (<span className="ml-2 badge badge-light">                    {this.props.totalQuantity}
        </span>) : (null); 
        const userManagement = isNull(this.props.userID) ? 
        (
            <li className="nav-item">
                <Link className="nav-link" to="/users/login">Login</Link>
            </li>
        )
        : 
        (<li className="nav-item">
        <Link className="nav-link" to="/users/profile">User Profile</Link>
    </li>)
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Online Shopping</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">
                                Cart 
                                {cartQuantityLabel}
                            </Link>
                        </li>

                        {userManagement}

                    </ul>
                </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        totalQuantity: state.cartReducers.totalQuantity,
        userID: state.userReducers.userID
    }
}

export default connect(mapStateToProps)(Navbar);