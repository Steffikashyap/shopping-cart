import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import shoppingcartReducer from "./reducers/shoppingcartReducer";

const rootReducer = combineReducers({
    shoppingcartReducer,
  });
  const store = createStore(rootReducer, applyMiddleware(thunk));
  
  export default store;