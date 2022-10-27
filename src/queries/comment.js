import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import CommentService from "../services/comment";

export const useGetPostComments = (payload) =>
    useInfiniteQuery(
        ["get-comments-of-post", payload],
        async ({ pageParam = payload.currentPage }) => {
            const { data } = await CommentService.getCommentsForPost({
                postId: payload.postId,
                page: pageParam,
                perPage: payload.perPage,
            });
            // console.log("page", pageParam);
            // console.log("next", data.length > 0 ? pageParam + 1 : undefined);
            return {
                data,
                nextPage: data.length > 0 ? pageParam + 1 : undefined,
            };
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
            retry: false,
            staleTime: 3600000,
        }
    );

export const useGetLimitComment = (payload) =>
    useQuery(["get-limit-comments", payload], async () => {
        const { data } = await CommentService.getCommentsForPost(payload);
        return data;
    });
