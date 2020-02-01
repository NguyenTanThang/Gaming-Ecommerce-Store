import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Footer extends Component {
    render() {
        return (
            <footer className="section-padding">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-3 col-md-6 col-sm-12 footer-item">
                            <h4>CUSTOMER SERVICE</h4>
                            <ul>
                                <li>
                                    <Link to="/">
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        Shipping
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        Return
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12 footer-item">
                            <h4>WORK WITH US</h4>
                            <ul>
                                <li>
                                    <Link to="/">
                                        Are you a desginer?
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        Become an Affiliate
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        Jobs
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12 footer-item">
                            <h4>ABOUT US</h4>
                            <ul>
                                <li>
                                    <Link to="/">
                                        Our Story
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        Press
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        Terms of Service
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12 footer-item">
                            <h4>STYLE TIPS</h4>
                            <form>
                                <input type="email" className="form-control" placeholder="Your Email Address"/>

                                <button type="submit" className="btn btn-block btn-danger mt-2">SUBCRIBE</button>
                            </form>
                        </div>

                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;
