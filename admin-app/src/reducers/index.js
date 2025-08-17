import { combineReducers } from "redux"
import authReducer from "./authReducer"
import userReducer from "./userReducer"
import categoryReducer from "./categoryReducer"
import orderReducer from "./orderReducer"
import productReducer from "./productReducer"


const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    // order: orderReducer
})

export default rootReducer