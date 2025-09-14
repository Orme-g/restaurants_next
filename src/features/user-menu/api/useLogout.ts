import { baseFetch } from "@/shared/api/baseFetch";
import { useMutation } from "@tanstack/react-query";
import { authStore } from "@/shared/store/auth.store";

export function useLogout() {
    const logoutUser = authStore((state) => state.logoutUser);
    return useMutation<void, Error, void>({
        mutationFn: () => baseFetch("/api/auth/logout", { method: "POST" }),
        onSuccess: () => logoutUser(),
    });
}
