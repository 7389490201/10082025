import { userConstant } from "../actions/constants"

const intiState = {
    error: null,
    message: "",
    loading: false,
}


export default (state = intiState, action) => {
    console.log(action)
    switch (action.type) {
        case userConstant.USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case userConstant.USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
            }
        case userConstant.USER_REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            return { ...state }
    }

}