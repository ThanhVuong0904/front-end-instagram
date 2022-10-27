import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import PostService from "../services/post";

export const useGetPostsFollowing = (payload) =>
    useInfiniteQuery(
        ["get-posts-following", payload],
        async ({ pageParam = payload.currentPage }) => {
            const { data } = await PostService.getPostsFollowing(pageParam, 10);
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

export const useGetPostsForYou = (payload) =>
    useInfiniteQuery(
        ["get-posts-foryou", payload],
        async ({ pageParam = payload.currentPage }) => {
            const { data } = await PostService.getPostsForYou(pageParam, 5);
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

export const useGetPostsOfUser = (payload) =>
    useInfiniteQuery(
        ["get-posts-of-user", payload],
        async ({ pageParam = payload.currentPage }) => {
            console.log("payload", payload);
            const { data } = await PostService.getAllPostOfUser({
                page: pageParam,
                perPage: 5,
                username: payload.username,
            });
            return {
                data,
                nextPage: data.length > 0 ? pageParam + 1 : undefined,
            };
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
            // retry: false,
            // staleTime: 3600000,
        }
    );

// Chưa sài
export const useGetPost = (payload) =>
    useQuery(
        ["get-post", payload],
        async () => {
            const { data } = await PostService.getPost(payload);
            return data;
        },
        { retry: false, staleTime: 3600000 }
    );
