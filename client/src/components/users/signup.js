import React, {Component} from "react";
import {Link} from "react-router-dom";
import Errors from "../errors/errors";
import {
    userSignup
} from "../../actions/userActions";
import {
    clearErrors
} from "../../actions/errorActions";
import {connect} from "react-redux";

class SignUp extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: "",
            email: "",
            password: ""
        }
    }

    componentDidMount(){
        this.onEndError();
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        this.props.userSignup(this.state);
        this.setState({
            email: "",
            password: "",
            username: ""
        });
        this.onEndError();
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

                    <form onSubmit={this.onSubmit} method="POST" id="signup-form">
                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-6">
                                <label htmlFor="username">Username</label>
                                <input className="form-control" placeholder="UserName" name="username" id="username"
                                type="text" value={this.state.username}
                                onChange={this.onChange}/>
                            </div>

                            <div className="col-sm-12 col-md-6 col-lg-6">
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
                                    Sign Up
                                </button>
                            </div>
                            <div className="col-6">
                                <Link to="/users/login" className="btn btn-light btn-block">
                                    Already had an account?
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
        messages: state.errorReducers.messages
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userSignup: (data) => dispatch(userSignup(data)),
        clearErrors: () => dispatch(clearErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);