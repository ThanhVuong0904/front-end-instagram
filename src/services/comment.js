import AxiosAPI from "../utils/request";

const getCommentsForPost = async ({ postId, page = 1, perPage = 10 }) => {
    return AxiosAPI.get(`/comment/${postId}?page=${page}&perPage=${perPage}`);
};

const commentPost = async ({ postId, comment }) => {
    return AxiosAPI.post(`/comment/${postId}`, { comment });
};
const CommentService = {
    getCommentsForPost,
    commentPost,
};

export default CommentService;
