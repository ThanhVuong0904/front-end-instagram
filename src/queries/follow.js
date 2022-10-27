import { useInfiniteQuery } from "@tanstack/react-query";
import FollowService from "../services/follow";

export const useGetFollowings = (payload) =>
    useInfiniteQuery(
        ["get-followings-of-user", payload],
        async ({ pageParam = payload.currentPage }) => {
            const { data } = await FollowService.getFollowings(
                payload.userId,
                pageParam,
                10
            );
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

export const useGetFollowers = (payload) =>
    useInfiniteQuery(
        ["get-followers-of-user", payload],
        async ({ pageParam = payload.currentPage }) => {
            const { data } = await FollowService.getFollowers(
                payload.userId,
                pageParam,
                10
            );
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
