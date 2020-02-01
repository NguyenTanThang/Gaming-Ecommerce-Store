import React, {Component} from "react";
import {Link} from "react-router-dom";
import Errors from "../errors/errors";
import {
    userLogin
} from "../../actions/userActions";
import {
    clearErrors
} from "../../actions/errorActions";
import {connect} from "react-redux";
import {isNull} from "../../validator/validator";

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }

    componentDidMount(){
        if (!isNull(this.props.jwtToken)){
            this.props.history.push("/users/profile");
        }
        this.onEndError();
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        this.props.userLogin(this.state);
        this.setState({
            email: "",
            password: ""
        });
        this.onEndError();

        if (localStorage.getItem("jwtToken") !== undefined || localStorage.getItem("jwtToken") !== null){
            setTimeout(() => {
                window.location = "/users/profile";
            }, 1000)
        }
    }

    onEndError = () => {
        this.props.clearErrors();
    }

    render(){
        const errors = this.props.messages.map(message => {
            return <Errors message={message}/>
        })
        return (
            <div className="container">
                <div className="row">
                    <div className="m-auto col-lg-6 col-md-9 col-sm-12 signup-form">

                    {errors}

                    <form onSubmit={this.onSubmit} method="POST" id="login-form">
                        <div className="row">
                            <div className="col-12">
                                <label htmlFor="email">Email</label>
                                <input className="form-control" placeholder="Email" name="email" id="email"
                                type="email" value={this.state.email} 
                                onChange={this.onChange}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <label htmlFor="password">Password</label>
                                <input className="form-control" placeholder="Password" name="password" id="password"
                                type="password" value={this.state.password} 
                                onChange={this.onChange}/>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-6">
                                <button type="submit" className="btn btn-primary btn-block">
                                    Login
                                </button>
                            </div>
                            <div className="col-6">
                                <Link to="/users/signup" className="btn btn-light btn-block">
                                    {"Don't have an account?"}
                                </Link>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.errorReducers.messages,
        jwtToken: state.userReducers.jwtToken,
        userID: state.userReducers.userID
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLogin: (data) => dispatch(userLogin(data)),
        clearErrors: () => dispatch(clearErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);