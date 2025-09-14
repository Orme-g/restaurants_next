import { baseFetch } from "@/shared/api/baseFetch";
import { useMutation } from "@tanstack/react-query";
import { authStore } from "@/shared/store/auth.store";
import type { ILoginDTO } from "../models/login.types";
import type { IUserStoreData } from "@/entities/user/models/user.types";

export function useLogin() {
    const loginUser = authStore((state) => state.loginUser);
    return useMutation<IUserStoreData, Error, ILoginDTO>({
        mutationFn: (loginData: ILoginDTO) =>
            baseFetch<IUserStoreData>("/api/auth/login", {
                method: "POST",
                body: JSON.stringify(loginData),
            }),
        onSuccess: (userData) => loginUser(userData),
    });
}
