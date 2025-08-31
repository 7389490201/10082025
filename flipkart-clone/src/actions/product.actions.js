import axiosInstance from "../Helper/axios";
import { productConstant } from "./constants";


export const getProductBySlug = (slug) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get(`/products/${slug}`);
            console.log(response);
            dispatch({
                type: productConstant.GET_PRODUCT_BY_SLUG_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            console.error("Error fetching product by slug:", error);
        }
    };
};
