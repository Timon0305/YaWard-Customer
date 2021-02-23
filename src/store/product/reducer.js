import {ADD_TO_CART} from "./actionTypes";

const initialState = {
    products: []
};

const Product = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            state = {
                ...state,
                products: [...action.payload.product]
            };
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
};

export default Product;
