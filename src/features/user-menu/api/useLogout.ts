import { baseFetch } from "@/shared/api/baseFetch";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/shared/store/auth.store";

export function useLogout() {
    const logoutUser = useAuthStore((state) => state.logoutUser);
    return useMutation<void, Error, void>({
        mutationFn: () => baseFetch("/api/auth/logout", { method: "POST" }),
        onSuccess: () => logoutUser(),
    });
}
