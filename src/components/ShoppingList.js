import React from 'react';

class ShoppingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartArr: []
        }
    }

    handleAddToCart = (productObj) => {
        let cartArrVal = [ ...this.state.cartArr];
        cartArrVal.push(productObj);
        this.setState({ cartArr: cartArrVal }, function () {
            this.props.getCartProducts(this.state.cartArr);

        });
    }
    render() {
        return (
            <div className="row productList">

                {this.props.productsList.length > 0 && (this.props.productsList).map((product, index) => {
                    return <div className="col-md-3 paddingBtm" key={index}>
                        <div >
                            <a href="#1" >
                                <img src={product.img_url} alt="laptop" className="dimensions" />
                                <p>{product.name}</p>
                            </a>
                            <b>${product.price} </b>
                            <button className="btn btn-primary" onClick={() => this.handleAddToCart(product)}>Add to cart</button>
                        </div>
                    </div>

                })}
            </div>

        );
    }

}

export default ShoppingList;