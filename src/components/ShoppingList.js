import React from 'react';

class ShoppingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartArr: [],
            count: 1,
        }
    }

    handleAddToCart = (productObj) => {
        let isIDpresent = false;
        let cartArrVal = [...this.state.cartArr];
        let productObjVal = { ...productObj };
        if (cartArrVal.length === 0) {
            productObjVal.count = 1;
            cartArrVal.push(productObjVal);
        }
        else {
            for (let i = 0; i < cartArrVal.length; i++) {
                if (cartArrVal[i].id === productObjVal.id) {
                    cartArrVal[i].count = cartArrVal[i].count + 1;
                    isIDpresent = true;
                    break;
                }
            }
            if (!isIDpresent) {
                productObjVal.count = 1;
                cartArrVal.push(productObjVal);
            }
        }

        this.setState({ cartArr: cartArrVal }, () => {
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
                            <button className="btn btn-primary btn-size" onClick={() => this.handleAddToCart(product)}>Add to cart</button>
                        </div>
                    </div>

                })}
            </div>

        );
    }

}

export default ShoppingList;