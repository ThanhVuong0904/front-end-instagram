import { useMutation } from "@tanstack/react-query";
import CommentService from "../services/comment";

export const useCreateComment = () => {
    return useMutation((payload) => CommentService.commentPost(payload));
};
