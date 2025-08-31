import { productConstant } from "../actions/constants";

const initState = {
    products: [],
    productByPrice: {
        under5k: [],
        under10k: [],
        under15k: [],
        under20k: [],
        under30k: []
    }
}

export default (state = initState, action) => {
    switch (action.type) {
        case productConstant.GET_PRODUCT_BY_SLUG_SUCCESS:
            return {
                ...state,
                product: action.payload,
                productByPrice: action.payload.productByPrice
            };
        default:
            return state;
    }
}