import AxiosAPI from "../utils/request";

const getFollowings = async (userId, page, perPage) => {
    return AxiosAPI.get(
        `/users/followings/${userId}?page=${page}&perPage=${perPage}`
    );
};

const getFollowers = async (userId, page, perPage) => {
    return AxiosAPI.get(
        `/users/followers/${userId}?page=${page}&perPage=${perPage}`
    );
};

const FollowService = {
    getFollowings,
    getFollowers,
};

export default FollowService;
