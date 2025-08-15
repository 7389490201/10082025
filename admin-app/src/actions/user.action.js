import { userConstant } from "./constants";
import axios from "../components/Helper/axios";


export const signup = (user) => {
    return async (dispatch) => {
        dispatch({ type: userConstant.USER_REGISTER_REQUEST });

        try {
            const res = await axios.post("/admin/signup", user);

            if (res.status === 201) {
                dispatch({
                    type: userConstant.USER_REGISTER_SUCCESS,
                    payload: { message: res.data.message }
                });
            } else {
                dispatch({
                    type: userConstant.USER_REGISTER_FAILURE,
                    payload: { error: res.data.error || "Login failed" }
                });
            }

        } catch (error) {
            dispatch({
                type: userConstant.USER_REGISTER_FAILURE,
                payload: { error: error.response?.data?.error || error.message || "Something went wrong" }
            });
        }
    };
};