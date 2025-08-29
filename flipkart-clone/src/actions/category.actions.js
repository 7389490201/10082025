import axios from "../components/Helper/axios"
import { categoryConstant } from "./constants"

export const getAllCategory = () => {
    return async (dispatch) => {
        dispatch({ type: categoryConstant.GET_ALL_CATEGORIES_REQUEST })
        const res = await axios.get("/category/get")

        if (res.status === 200) {
            const { categories } = res.data
            dispatch({
                type: categoryConstant.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: categories }
            })
        } else {
            dispatch({
                type: categoryConstant.GET_ALL_CATEGORIES_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}

