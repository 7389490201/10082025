import axios from "../components/Helper/axios"
import { productConstant } from "./constants"

export const createProduct = (form) => {
    return async (dispatch) => {
        dispatch({
            type: productConstant.ADD_NEW_PRODUCT_REQUEST
        })
        const res = await axios.post("/product/create", form)
        if (res.status === 201) {
            dispatch({
                type: productConstant.ADD_NEW_PRODUCT_SUCCESS,
                payload: { product: res.data.product }
            })
        } else {
            dispatch({
                type: productConstant.ADD_NEW_PRODUCT_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}