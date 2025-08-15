import axios from "../components/Helper/axios";
import { authConstant } from "./constants";

export const login = (user) => {
    return async (dispatch) => {
        dispatch({ type: authConstant.LOGIN_REQUEST });

        try {
            const res = await axios.post("/admin/signin", user);

            if (res.status === 200) {
                const { token, user } = res.data;

                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));

                dispatch({
                    type: authConstant.LOGIN_SUCCESS,
                    payload: { token, user }
                });
            } else {
                dispatch({
                    type: authConstant.LOGIN_FAILURE,
                    payload: { error: res.data.error || "Login failed" }
                });
            }

        } catch (error) {
            dispatch({
                type: authConstant.LOGIN_FAILURE,
                payload: { error: error.response?.data?.error || error.message || "Something went wrong" }
            });
        }
    };
};

export const isUserLoggedin = () => {
    return async (dispatch) => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = JSON.parse(localStorage.getItem("user"));
            dispatch({
                type: authConstant.LOGIN_SUCCESS,
                payload: { token, user }
            });
        }
        else {
            dispatch({
                type: authConstant.LOGIN_FAILURE,
                payload: { error: "Login failed" }
            });
        }
    }
}

export const signout = () => {
    return async (dispatch) => {
        localStorage.clear()
        dispatch({
            type: authConstant.LOGOUT_REQUEST
        })


    }
}