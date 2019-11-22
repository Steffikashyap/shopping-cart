import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    handleCartClick=()=>{
        this.props.gotoCheckoutPage();
    }
    render() {
        return (
            <nav className="navbar">
                <div className="container">
                    <div className="navbar-right cart-position">
                        <i className="fa fa-search" ></i>
                        <span>&nbsp;</span><span>&nbsp;</span>
                        <i className="fa fa-shopping-cart" onClick={() => this.handleCartClick()}><span>&nbsp;&nbsp;<b>{this.props.productCount}&nbsp;&nbsp;</b></span></i>
                    </div>
                </div>
            </nav>
        );
    }
};

export default Header;