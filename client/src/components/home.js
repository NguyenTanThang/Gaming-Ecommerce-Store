import React, { Component } from 'react';
import ProductList from "./productList";
import {Link} from "react-router-dom";
import axios from "axios";

class Home extends Component {

    state = {
        productItems: []
    }

    componentWillMount(){
        axios.get("/products")
        .then(response => {
            this.setState({
                productItems: response.data.products.slice(0,6)
            })
        })
    }

    render() {
        return (
            <div>
                <div className="home-banner">
                    <div className="banner-content centralize text-center">
                        <h1>WELCOME TO OUR GAME E-COMMERCE WEBSITE</h1>
                    </div>
                </div>

                <section id="featured" className="section-padding">
                    <div className="container">
                        <div className="section-header">
                            <h2>FEATURED BRANDS</h2>
                        </div>

                        <div className="row align-items-center justify-content-between">

                            <div className="col-lg-2 col-md-5 col-sm-12 feature-item">
                                <img className="img-fluid" src="/img/rockstar-icon-img.png" alt="Rockstar Icon"/>
                            </div>

                            <div className="col-lg-2 col-md-5 col-sm-12 feature-item">
                                <img className="img-fluid" src="/img/ea-icon-img.png" alt="EA Icon"/>
                            </div>

                            <div className="col-lg-2 col-md-5 col-sm-12 feature-item">
                                <img className="img-fluid" src="/img/ubisoft-icon-img.png" alt="Ubisoft Icon"/>
                            </div>

                            <div className="col-lg-2 col-md-5 col-sm-12 feature-item">
                                <img className="img-fluid" src="/img/capcom-icon-img.jpg" alt="Capcom Icon"/>
                            </div>
                        
                        </div>
                    </div>
                </section>

                <section id="about" className="section-padding">
                    <div className="container">
                        <div className="section-header">
                            <h2>ABOUT US</h2>
                        </div>
                    
                        <div className="row justify-content-around text-center">
                            <div className="col-lg-4 col-md-6 col-sm-12 about-img">
                                <img src="/img/about-img.jpg" className="img-fluid" alt="About"/>
                            </div>
                        
                            <div className="col-lg-6 col-md-6 col-sm-12 about-content">
                                <p>
                                    {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
                                </p>
                            </div>
                        </div>  
                    </div>
                </section>

                <section id="home-product-list" className="section-padding">
                    <div className="container">
                        <div className="section-header">
                            <h2>FEATURED PRODUCTS</h2>
                        </div>
                    </div>

                    <ProductList productItems={this.state.productItems}/>

                    <div className="text-center mt-4">
                        <Link to="/products" className="btn btn-dark">VIEW MORE</Link>
                    </div>
                </section>
            </div>
        )
    }
}

export default Home;
