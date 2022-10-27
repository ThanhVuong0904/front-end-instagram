export const setTokens = (tokens) => {
    return localStorage.setItem("tokens", JSON.stringify(`Bearer ${tokens}`));
};

export const getTokens = () => JSON.parse(localStorage.getItem("tokens"));

export const clearToken = () => localStorage.removeItem("tokens");

export const setUserData = (userData) => {
    return localStorage.setItem("userData", JSON.stringify(userData));
};

export const getUserData = () => {
    const item = localStorage.getItem("userData");

    try {
        return JSON.parse(item || '{"":""}');
    } catch (error) {
        localStorage.removeItem("userData");
        return '{"":""}';
    }
};
