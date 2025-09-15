import { baseFetch } from "@/shared/api/baseFetch";
import { useMutation } from "@tanstack/react-query";
import { authStore } from "@/shared/store/auth.store";
import { useRouter, useSearchParams } from "next/navigation";
import { TLoginData } from "@/processes/auth/model/auth.validators";
import type { IUserStoreData } from "@/entities/user/models/user.types";

export function useLogin() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect");
    const loginUser = authStore((state) => state.loginUser);
    return useMutation<IUserStoreData, Error, TLoginData>({
        mutationFn: (loginData: TLoginData) =>
            baseFetch<IUserStoreData>("/api/auth/login", {
                method: "POST",
                body: JSON.stringify(loginData),
            }),
        onSuccess: (userData) => {
            loginUser(userData);
            router.replace(redirect || "/");
        },
    });
}
