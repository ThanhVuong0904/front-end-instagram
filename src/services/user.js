import AxiosAPI from "../utils/request";

//Search by nickname
const searchUser = async (query) => {
    return AxiosAPI.get(`/users?q=${query}`);
};

const getCurrentUser = async () => {
    return AxiosAPI.get("auth/me");
};

const getUser = async (username) => {
    return AxiosAPI.get(`users/${username}`);
};

const followUser = async (id) => {
    return AxiosAPI.post(`/users/follow/${id}`);
};

const unfollowUser = async (id) => {
    return AxiosAPI.post(`/users/unfollow/${id}`);
};
const UserService = {
    searchUser,
    getCurrentUser,
    getUser,
    followUser,
    unfollowUser,
};

export default UserService;
