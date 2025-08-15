import { authConstant } from "../actions/constants"

const initState = {
    token: null,
    user: {
        firstName: "",
        lastName: "",
        email: "",
    },
    authenticating: false,
    authenticate: false,
    loading: false,
    error: null,
    message: ""
}

export default (state = initState, action) => {
    console.log(action)
    switch (action.type) {
        case authConstant.LOGIN_REQUEST:
            return {
                ...state,
                authenticating: true
            }
        case authConstant.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                authenticating: false,
                authenticate: true
            }
        case authConstant.LOGIN_FAILURE:
            return {
                ...state,
                authenticating: false,
                authenticate: false
            }
        case authConstant.LOGOUT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case authConstant.LOGOUT_SUCCESS:
            return {
                ...initState,
            }
        case authConstant.LOGOUT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            return state
    }

}