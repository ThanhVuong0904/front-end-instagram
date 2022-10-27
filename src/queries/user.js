import { useQuery } from "@tanstack/react-query";
import UserService from "../services/user";

export const useGetCurrentUser = () =>
    useQuery(["get-current-user"], async () => {
        const { data } = await UserService.getCurrentUser();
        return data;
    });

export const useGetUserInfo = (username) =>
    useQuery(["get-user-info"], async () => {
        const { data } = await UserService.getUser(username);
        return data;
    });
