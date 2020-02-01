import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import axios from "axios";
import {
    setLoading,
    clearLoading
} from "../../actions/loadingActions";
import {
    userLogout
} from "../../actions/userActions";
import {
    isNull
} from "../../validator/validator";
import OrderList from "./orders/orderList";

class Profile extends Component{
    constructor(props){
        super(props);

        this.state = {
            user: {}
        }
    }

    componentDidMount(){
        if (isNull(this.props.userID)){
            this.props.history.push("/users/login");
        }
        this.props.setLoading();
        axios.get(`/users/${this.props.userID}`)
        .then(response => {
            this.setState({
                user: response.data
            },() => {
                this.props.clearLoading();
            })
        })
    }

    onLogout = () => {
        this.props.userLogout();
        this.props.history.push("/users/login");
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
            return (
                <div className="container section-padding">
                    <div className="row mb-4">
                        <div className="col-12 ml-4">
                            <h1>{this.state.user.email}</h1>
                            <Link onClick={this.onLogout} className="btn btn-danger mt-2">Logout</Link>
                        </div>
                    </div>
                    <OrderList/>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userID: state.userReducers.userID,
        loading: state.loadingReducers.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoading: () => dispatch(setLoading()),
        clearLoading: () => dispatch(clearLoading()),
        userLogout: () => dispatch(userLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);