import { categoryConstant } from "../actions/constants"

const initState = {
    categories: [],
    loading: false,
    error: null

}

export default (state = initState, action) => {
    console.log(action)
    switch (action.type) {
        case categoryConstant.GET_ALL_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload.categories
            }
        case categoryConstant.ADD_NEW_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case categoryConstant.ADD_NEW_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case categoryConstant.ADD_NEW_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }

}