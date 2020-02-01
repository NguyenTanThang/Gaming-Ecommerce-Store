import React, {Component} from "react";
import {isNull} from "../validator/validator";
import {CardElement, injectStripe} from 'react-stripe-elements';
import Axios from "axios";
import {connect} from "react-redux";
import {clearCart} from "../actions/cartActions";

class Checkout extends Component {
    componentWillMount(){
        if (localStorage.getItem("totalQuantity") == 0 || isNull(localStorage.getItem("totalQuantity"))){
            window.location.replace("/");
        }

        if (isNull(localStorage.getItem("userID"))){
            window.location.replace("/users/login");
        }
    }

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {
        complete: false,
        disabled: false
    };
    
  }

  async submit(ev) {
      this.setState({
          disabled: true
      })
    console.log(this.props.stripe);
    // User clicked submit
    let {token} = await this.props.stripe.createToken({name: "Name"});
    let response = await Axios.post("/checkout", {
        token: token.id,
        totalPrice: localStorage.getItem("totalPrice"),
        cartItems: JSON.parse(localStorage.getItem("cartItems")),
        userID: localStorage.getItem("userID")
    });

    if (response.data.status == 'succeeded') {   
        this.props.clearCart();   
        this.setState({
            disabled: false
        })           
        window.location.replace("/");
    }
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;

    const checkOutButton = this.state.disabled ? 
    (<button disabled className="mt-4 btn btn-primary" onClick={this.submit}>Purchase</button>)
    :
    (<button className="mt-4 btn btn-primary" onClick={this.submit}>Purchase</button>)

    return (
                <div className="row section-padding">
                    <div className="m-auto col-lg-6 col-md-9 col-sm-12">
                        <p>Would you like to complete the purchase?</p>
                        <CardElement />
                        {checkOutButton}
                    </div>
                </div>
                
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(clearCart())
    }   
}

export default injectStripe(connect(null, mapDispatchToProps)(Checkout));