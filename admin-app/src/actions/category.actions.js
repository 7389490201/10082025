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

export const addCategory = (form) => {
    return async (dispatch) => {
        dispatch({ type: categoryConstant.ADD_NEW_CATEGORY_REQUEST })
        const res = await axios.post("/category/create", form);
        if (res.status === 201) {
            dispatch({
                type: categoryConstant.ADD_NEW_CATEGORY_SUCCESS,
                payload: { category: res.data.category }
            })

        } else {
            dispatch({
                type: categoryConstant.ADD_NEW_CATEGORY_FAILURE,
                payload: { error: res.data.error }
            })
        }

    }
}

export const updateCategories = (form) => {
    return async dispatch => {
        dispatch({ type: categoryConstant.UPDATE_CATEGORIES_REQUEST });
        const res = await axios.post(`/category/update`, form);

        if (res.status === 200) {
            dispatch({
                type: categoryConstant.UPDATE_CATEGORIES_SUCCESS,
                payload: { categories: res.data.categories }
            });
        } else {
            dispatch({
                type: categoryConstant.UPDATE_CATEGORIES_FAILURE,
                payload: { error: res.data.error }
            });
        }
    };
};
export const deleteCategories = (ids) => {
    return async dispatch => {
        dispatch({ type: categoryConstant.DELETE_CATEGORIES_REQUEST });
        const res = await axios.post(`/category/delete`, {
            payload: { ids }
        });
        console.log(res);
        if (res.status === 200) {
            dispatch({
                type: categoryConstant.DELETE_CATEGORIES_SUCCESS,
                payload: { categories: res.data.categories }
            });
        } else {
            dispatch({
                type: categoryConstant.DELETE_CATEGORIES_FAILURE,
                payload: { error: res.data.error }
            });
        }
    };
};
