import axios from "axios"
import { api } from "../../urlConfig"

const axiosInstance = axios.create({
    baseURL: api,
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
})

axiosInstance.interceptors.request.use((req) => {
    if (localStorage.getItem("token")) {
        req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    }

    return req;
})

axiosInstance.interceptors.response.use((res) => {
    return res;
}, (error) => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    if (expectedError) {
        // Handle expected errors
    } else {
        // Handle unexpected errors
    }
    return Promise.reject(error);
})

export default axiosInstance