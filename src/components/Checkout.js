import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import CartItems from './CartItems';

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uniqueItems: [],
        };
    }

    componentDidMount() {
        this.fetchListOfProducts();
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

    fetchListOfProducts() {
        let addedItems = this.props.location.state.addedProducts.length > 0 ? this.props.location.state.addedProducts : [];
        let unique = addedItems.filter((set => item => !set.has(item.id) && set.add(item.id))(new Set));
        this.setState({
            uniqueItems: unique
        });
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
                                let productCount = this.getCountOfProduct(product.id);
                                return <CartItems productCount={productCount} product={product} index={index} />
                            })

                        }
                    </Col>
                    <Col md={3}>
                        <div className="price-details">
                            <div><b>PRICE DETAILS : </b> </div>
                            <div>
                                <div>
                                    <span>Price (1 item ):
                                    <span className="">
                                            X</span>
                                    </span>
                                </div>
                                <div>
                                    <span>Disount:
                                    <span className="">
                                            X</span>
                                    </span>
                                </div>
                                <div>
                                <b>Total Payable </b>
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