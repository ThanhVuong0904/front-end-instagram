import { useMutation } from "@tanstack/react-query";
import UserService from "../services/user";

export const useFollow = () => {
    return useMutation((payload) => UserService.followUser(payload));
};

export const useUnFollow = () => {
    return useMutation((payload) => UserService.unfollowUser(payload));
};
