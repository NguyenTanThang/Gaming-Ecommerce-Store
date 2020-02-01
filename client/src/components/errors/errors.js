import React, {Component} from "react";

class Errors extends Component {
    render(){
        const {message} = this.props;
        return (
            <div className={`alert ${message.msg_class} fade show`} role="alert">
                <strong>{message.msg}</strong>
            </div>
        )
    }
}

export default Errors;