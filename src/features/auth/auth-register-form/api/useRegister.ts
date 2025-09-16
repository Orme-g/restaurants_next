import { baseFetch } from "@/shared/api/baseFetch";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { TRegisterData } from "@/processes/auth/model/auth.validators";

export function useRegister() {
    const router = useRouter();
    return useMutation({
        mutationFn: (data: TRegisterData) =>
            baseFetch<{ message: string }>("/api/auth/register", {
                method: "POST",
                body: JSON.stringify(data),
            }),
        onSuccess: () => {
            router.push("/login");
        },
    });
}
