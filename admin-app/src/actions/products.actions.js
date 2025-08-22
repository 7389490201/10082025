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

export const getInitialData = () => {
    return async (dispatch) => {
        dispatch({
            type: productConstant.GET_INITIAL_DATA_REQUEST
        })

        const res = await axios.post("/initialdata")
        if (res.status === 200) {
            dispatch({
                type: productConstant.GET_INITIAL_DATA_SUCCESS,
                payload: { product: res.data.product }
            })
        } else {
            dispatch({
                type: productConstant.GET_INITIAL_DATA_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}