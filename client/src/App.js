import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "jquery";
import "popper.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// Static Component
import Navbar from "./components/partials/navBar";
import Footer from "./components/partials/footer";

// Components
import Home from "./components/home";
import Products from  "./components/products";
import SingleProductItem from "./components/singleProductItem";
import Cart from "./components/cart";
import SignUp from "./components/users/signup";
import Login from "./components/users/login";
import Profile from "./components/users/profile";
import CheckoutForm from "./components/checkoutForm";
import OrderDetail from "./components/users/orders/orderDetail";

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Router>
          <Navbar/>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/products/:id" component={SingleProductItem} />
            <Route path="/cart" component={Cart}/>
            <Route path="/checkout" component={CheckoutForm}/>
            <Route path="/users/signup" component={SignUp}/>
            <Route path="/users/login" component={Login}/>
            <Route path="/users/profile" component={Profile}/>
            <Route path="/orders/:id" component={OrderDetail}/>
            <Route path="/products" component={Products}/>
          </Switch>
          <Footer/>
        </Router>
      </div>
    );
  }
}

export default App;
