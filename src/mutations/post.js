import { useMutation } from "@tanstack/react-query";
import PostService from "../services/post";

export const useCreatePost = () => {
    return useMutation((payload) => PostService.createPost(payload));
};

export const useReactionPost = () => {
    return useMutation((payload) => PostService.reactionPost(payload));
};
