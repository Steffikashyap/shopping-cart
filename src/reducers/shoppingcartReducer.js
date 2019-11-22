const initialState = {
    productsList: [],
    dataFetchObj: {},

};
const shoppingcartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_ITEMS": {
            return {
                ...state, productsList: action.payload,
            }
        }
        case "DATA_FETCHED": {
            return {
                ...state, dataFetchObj: action.payload,
            }
        }
        default: {
            return state;
        }
    }
}

export default shoppingcartReducer;