import React, {Component} from "react";
import ProductItem from "./productItem";
import PropTypes from "prop-types";

class ProductList extends Component{
    constructor(props){
        super(props);
    }

    render(){
        
        /*
        let productItems = [];
        if (this.props.productItems !== undefined){
            productItems = this.props.productItems
        }
        */

            return(
                <div className="container">
                    <div className="row justify-content-around">
                        {this.props.productItems .map((productItem) => {
                            return <ProductItem key={productItem._id} productItem={productItem}/> 
                        })}
                    </div>
                </div>
            )
    }
}

ProductList.propTypes = {
    productItems: PropTypes.array
  };

export default ProductList;