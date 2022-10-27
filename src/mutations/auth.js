import { useMutation } from "@tanstack/react-query";
import AuthService from "../services/auth";

export const useLogin = () =>
    useMutation((payload) => AuthService.login(payload));

export const useSignUp = () =>
    useMutation((payload) => AuthService.signup(payload));
