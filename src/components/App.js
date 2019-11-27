import React from 'react';
import '../App.css';
import Header from "./Header.js";
import 'font-awesome/css/font-awesome.min.css';
import Filter from './Filter';
import SortingBy from './SortingBy';
import ShoppingList from './ShoppingList';
import { connect } from 'react-redux';
import { getProductList } from '../actions/shoppingcartAction';
import { Container, Row, Col } from 'react-bootstrap';
import { func } from 'prop-types';
import Checkout from './Checkout';
import { withRouter } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfProducts: [],
      filteredArr: [],
      productCount: 0,
      cartArrP: [],
      showCheckOutPage: false,
    }
    this.handleSortingPrices = this.handleSortingPrices.bind(this);
    this.getFilterValue = this.getFilterValue.bind(this);
    this.getCartProducts = this.getCartProducts.bind(this);
    this.gotoCheckoutPage = this.gotoCheckoutPage.bind(this);
  }


  componentDidMount() {
    this.props.dispatch(getProductList());
  }

  static getDerivedStateFromProps(props, state) {
    if (props.hasOwnProperty("dataFetchObj") && props.dataFetchObj.actionName === "DATA_FETCHED" && props.dataFetchObj.status) {
      const payload = {
        actionName: "DATA_FETCHED",
        status: false
      };
      props.dispatch({ type: "DATA_FETCHED", payload: payload });
      return { listOfProducts: props.productsList };
    }
  }

  handleSortingPrices(sortby) {
    this.setState({
      listOfProducts: sortby
    });
  }

  getFilterValue(filterPrice) {
    let plist = this.props.productsList;
    let filteredArr = [];
    for (let i = 0; i < plist.length; i++) {
      if (plist[i].price < filterPrice) {
        filteredArr.push(plist[i]);
      }
    }
    this.setState({
      listOfProducts: filteredArr,
    });

  }

  getCartProducts(cartArr) {
    this.setState({
      productCount: cartArr.length,
      cartArrP: cartArr,
    });
  }

  gotoCheckoutPage() {
    this.props.history.push({
      pathname: '/Checkout',
      state: {
        addedProducts: this.state.cartArrP
      }
    })
    
  }

  render() {
    return (
      <div className="App">
        {/*this.state.showCheckOutPage ? <Container><Checkout cartArrP={this.state.cartArrP}/></Container> :*/}
        <div>
          <Header productCount={this.state.productCount} gotoCheckoutPage={this.gotoCheckoutPage} />
          <Container>
            <Row>
              <Col md={3}>
                <Filter getFilterValue={this.getFilterValue} />
              </Col>
              <Col md={9}>
                <SortingBy productsList={this.state.listOfProducts} handleSortingPrices={this.handleSortingPrices} />
                <ShoppingList productsList={this.state.listOfProducts} getCartProducts={this.getCartProducts} />
              </Col>
            </Row>
          </Container>
          </div>
      </div>
    )

  };
}

function mapStateToProps(state) {
  return {
    productsList: state.productsList,
    dataFetchObj: state.dataFetchObj,
  }
}
export default connect(mapStateToProps)(withRouter(App));