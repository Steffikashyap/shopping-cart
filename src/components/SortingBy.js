import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class SortingBy extends React.Component {
    constructor(props) {
        super(props);
        this.state = { sortedArray: [] };
    }


    handleSortingPricesLocal = (sortby) => {
        let sortedArray = [];
        if (sortby === "DECREASE") {
            sortedArray = this.props.productsList.sort((a, b) => (a.price < b.price) ? 1 : -1);
        } else if (sortby === "INCREASE") {
            sortedArray = this.props.productsList.sort((a, b) => (a.price > b.price) ? 1 : -1);
        } else {
            sortedArray = this.props.productsList.sort((a, b) => {
                let discountedA = a.discount ? (a.price - a.discount) : a.price;
                let discountedB = b.discount ? (b.price - b.discount) : b.price;
                return (discountedA > discountedB) ? 1 : -1;
            });
        }
        this.props.handleSortingPrices(sortedArray);
    }
    render() {
        return (
            <div className="sorting-bar block-example border-bottom border-dark">
                <Row>
                    <Col className="sorting">
                        <b className="sortingTitle">Sort By</b>
                    </Col>
                    <Col><span onClick={() => this.handleSortingPricesLocal("DECREASE")}>Price -- High Low</span></Col>
                    <Col><span onClick={() => this.handleSortingPricesLocal("INCREASE")}>Price -- Low High</span></Col>
                    <Col><span onClick={() => this.handleSortingPricesLocal("DISCOUNT")}>Discount</span></Col>
                </Row>
            </div>
        );
    }

}

export default SortingBy;