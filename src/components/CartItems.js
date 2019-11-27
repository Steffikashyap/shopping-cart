import React from 'react';
import { Row } from 'react-bootstrap';


class CartItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productCount: this.props.productCount,
        };
        this.handleQuantity = this.handleQuantity.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
    }

    componentDidMount() {
    }

    handleQuantity(type) {
        let count = this.state.productCount;
        if (type === "PLUS") {
            count++;
        } else {
            count--;
        }
        this.setState({
            productCount: count,
        });
    }

    handleRemoveItem(){
        this.setState({
            productCount: 0,
        });
    }

    render() {
        let product = this.props.product;
        return (
            <div className="item" key={this.props.index}>
                <div className="buttons">
                    <span className="delete-btn"></span>
                    <span className="like-btn"></span>
                </div>
                <div className="image">
                    <img src={product.img_url} alt="" />
                </div>
                <div className="description">
                    <span>{product.name}</span>
                </div>
                <div className="quantity">
                    <button className="plus-btn" type="button" name="button" onClick={() => this.handleQuantity("PLUS")}>
                        +
                    </button>
                    <input type="text" name="name" value={this.state.productCount} />
                    <button className="minus-btn" type="button" name="button" onClick={() => this.handleQuantity("MINUS")}>
                        -
                    </button>
                </div>
                <div className="total-price">${product.price}</div>
                <div className="total-price" onClick={() => this.handleRemoveItem()}><b>REMOVE</b></div>
            </div>
        );
    }
};

export default CartItems;