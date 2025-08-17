import { productConstant } from "../actions/constants"

const intiState = {
    product: {},
    loading: false,
    error: null
}

export default (state = intiState, action) => {
    console.log(action)
    switch (action.type) {
        case productConstant.ADD_NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case productConstant.ADD_NEW_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload.product
            }
        case productConstant.ADD_NEW_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            return state
    }

}