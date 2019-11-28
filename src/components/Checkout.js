import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uniqueItems: [],
            totalItems: 0,
            totalPrice: 0,
            totalReduction: 0,
            amountPayable: 0
        };
        this.handleQuantity = this.handleQuantity.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.getPaymentDetails = this.getPaymentDetails.bind(this);
        this.getDiscountPercentage = this.getDiscountPercentage.bind(this);
    }

    componentDidMount() {
        let addedItems = this.props.location.state.addedProducts.length > 0 ? this.props.location.state.addedProducts : [];
        this.setState({
            uniqueItems: addedItems
        }, function () {
            this.getPaymentDetails(this.state.uniqueItems);
        });
    }

    getCountOfProduct(id) {
        let values = this.props.location.state.addedProducts;
        let count = 0;
        for (let i = 0; i < values.length; i++) {
            if (id === values[i].id) {
                count++;
            }
        }
        return count;
    }


    handleQuantity(type, item) {
        let pArray = [...this.state.uniqueItems];
        for (let i = 0; i < pArray.length; i++) {
            if (pArray[i].id === item.id) {
                if (type === "PLUS") {
                    pArray[i].count++;
                } else {
                    if (pArray[i].count > 0) {
                        pArray[i].count--;
                    } else {
                        pArray[i].count = 0;
                    }
                }
                break;
            }
        }
        this.setState({
            uniqueItems: pArray,
        }, function () {
            this.getPaymentDetails(this.state.uniqueItems);
        });
    }

    handleRemoveItem(item) {
        let pArray = [...this.state.uniqueItems];
        for (let i = 0; i < pArray.length; i++) {
            if (pArray[i].id === item.id) {
                let index = pArray.indexOf(pArray[i]);
                if (index > -1) {
                    pArray.splice(index, 1);
                    break;
                }
            }
        }
        this.setState({
            uniqueItems: pArray,
        }, function () {
            this.getPaymentDetails(this.state.uniqueItems);
        });
    }

    getPaymentDetails(cartItems) {
        let totalNumberOfItems = 0, totalCost = 0, totalDiscount = 0, netPayableAmount = 0;
        for (let i = 0; i < cartItems.length; i++) {
            totalNumberOfItems = totalNumberOfItems + cartItems[i].count;
            totalCost = totalCost + cartItems[i].count * cartItems[i].price;
            totalDiscount = totalDiscount + cartItems[i].count * cartItems[i].discount;
            netPayableAmount = totalCost - totalDiscount;
        }
        this.setState({
            totalItems: totalNumberOfItems,
            totalPrice: totalCost,
            totalReduction: totalDiscount,
            amountPayable: netPayableAmount
        });
    }

    getDiscountPercentage(item) {
        let discountP = item.discount / item.price * 100;
        discountP = discountP.toFixed(2)
        return discountP + "%";
    }
    render() {

        return (
            <Container >
                <Row>
                    <Col md={8} className="shopping-cart">
                        <div className="title">
                            Shopping Bag
                    </div>
                        {this.state.uniqueItems.length === 0 ?
                            <Row>No products in your Cart.</Row>
                            :
                            this.state.uniqueItems.length > 0 && (this.state.uniqueItems).map((product, index) => {
                                return <div className="item" key={index}>
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
                                        <button className="plus-btn" type="button" name="button" onClick={() => this.handleQuantity("PLUS", product)}>
                                            +
                                    </button>
                                        <span>&nbsp;&nbsp;{product.count}&nbsp;&nbsp;</span>
                                        <button className="minus-btn" type="button" name="button" onClick={() => this.handleQuantity("MINUS", product)}>
                                            -
                                    </button>
                                    </div>
                                    <div className="total-price">${product.price}</div>
                                    <span className="discount-price">{this.getDiscountPercentage(product)} Off</span>
                                    <div className="remove-item" onClick={() => this.handleRemoveItem(product)}><b>REMOVE</b></div>
                                </div>
                            })

                        }
                    </Col>
                    <Col md={3}>
                        <div className="price-details">
                            <div><b>PRICE DETAILS : </b> </div>
                            <div>
                                <div>
                                    <span>Price ({this.state.totalItems + " "} items ) :
                                    <span className="">
                                            {this.state.totalPrice}</span>
                                    </span>
                                </div>
                                <div>
                                    <span>Disount :
                                    <span className="">
                                            {this.state.totalReduction}</span>
                                    </span>
                                </div>
                                <div>
                                    <b>Total Payable :  </b>
                                    <span className="">
                                        {this.state.amountPayable}</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
};

export default Checkout;