import { useState, useEffect } from "react";
import { instance } from "../utils/request";

const ax = instance; // export this and use it in all your components

const useAxiosLoader = () => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const inc = (mod) => setCounter((c) => c + mod);

        const handleRequest = (config) => {
            inc(1);
            return config;
        };
        const handleResponse = (response) => {
            inc(-1);
            return response;
        };
        const handleError = (error) => {
            inc(-1);
            return Promise.reject(error);
        };

        // add request interceptors
        const reqInterceptor = ax.interceptors.request.use(
            handleRequest,
            handleError
        );
        // add response interceptors
        const resInterceptor = ax.interceptors.response.use(
            handleResponse,
            handleError
        );
        return () => {
            // remove all intercepts when done
            ax.interceptors.request.eject(reqInterceptor);
            ax.interceptors.response.eject(resInterceptor);
        };
    }, []);

    return counter > 0;
};

export default useAxiosLoader;
