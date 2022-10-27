import axios from "axios";
import { clearToken, getTokens } from "./storage";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_API,
});

const defaultHeader = {
    "Content-Type": "application/json",
};
const multipartHeader = {
    "Content-type": "multipart/form-data",
};

instance.interceptors.request.use(
    (config) => {
        const token = getTokens();

        if (token) {
            config.headers.Authorization = token;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (config) => {
        return config;
    },
    (error) => {
        console.log("error response", error);
        if (
            error.response.data.errors.message === "jwt expired" ||
            error.response.data.errors.status === 401
        ) {
            clearToken();
            window.location.replace("/");
        }

        return Promise.reject(error);
    }
);

const api = (method, url, variables, formData = false) => {
    return new Promise((resolve, reject) => {
        instance({
            url,
            method,
            params: method === "get" ? variables : undefined,
            data: method !== "get" ? variables : undefined,
            headers: formData ? multipartHeader : defaultHeader,
        })
            .then((response) => {
                if (response && response.status === 401) {
                    console.log("ERR:::", response);
                }
                resolve(response.data);
            })
            .catch((error) => {
                console.log("error", error);
                if (error.response) {
                    if (error.response.status === 401) {
                        console.log("ERR:::", error);
                    }
                    reject(error.response.data);
                } else {
                    reject(
                        "Something went wrong. Please check your internet connection or contact our support."
                    );
                }
            });
    });
};

const AxiosAPI = {
    get: (...agrs) => api("get", ...agrs),
    post: (...agrs) => api("post", ...agrs),
    delete: (...agrs) => api("delete", ...agrs),
    put: (...agrs) => api("put", ...agrs),
    patch: (...agrs) => api("patch", ...agrs),
};

export default AxiosAPI;
