import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './components/App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import shoppingcartReducer from "./reducers/shoppingcartReducer";
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from 'history';
import Checkout from './components/Checkout';

const history = createBrowserHistory();

const store = createStore(shoppingcartReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter history={history}>
            <Switch>
                <Route exact path="/" component={App}></Route>
                <Route path="/Checkout" component={Checkout} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


