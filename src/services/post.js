import AxiosAPI from "../utils/request";

const getPostsForYou = async (page, perPage) => {
    return AxiosAPI.get(`/posts?page=${page}&type=forYou&perPage=${perPage}`);
};

const getAllPostOfUser = async ({ page, perPage, username }) => {
    return AxiosAPI.get(
        `/posts/user/${username}?page=${page}&perPage=${perPage}`
    );
};

const getPostsFollowing = async (page, perPage) => {
    return AxiosAPI.get(
        `/posts?page=${page}&type=following&perPage=${perPage}`
    );
};

const getPost = async (postId) => {
    return AxiosAPI.get(`/posts/${postId}`);
};
const getAllUserReactionPost = async (postId, page = 1, perPage = 10) => {
    return AxiosAPI
        .get
        // `/posts/reaction/${postId}?page=${page}&perPage=${perPage}`
        ();
};

const reactionPost = async (postId) => {
    return AxiosAPI.post(`post-reaction/${postId}`);
};

const createPost = async (data) => {
    return AxiosAPI.post(`posts`, data, true);
};
const PostService = {
    getPostsForYou,
    getPostsFollowing,
    getAllUserReactionPost,
    getAllPostOfUser,
    getPost,
    reactionPost,
    createPost,
};

export default PostService;
