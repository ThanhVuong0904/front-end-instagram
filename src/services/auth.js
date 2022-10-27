import AxiosAPI from "../utils/request";

/**
 * @typedef { import("../types/login").Login } User
 */

/**
 * @param {User} user
 */
const login = async (user) => {
    return AxiosAPI.post("/auth/login", user);
};

const signup = async (user) => {
    return AxiosAPI.post("/auth/register", user);
};

const AuthService = {
    login,
    signup,
};

export default AuthService;
