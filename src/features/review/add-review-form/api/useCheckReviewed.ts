import { baseFetch } from "@/shared/api/baseFetch";
import { useQuery } from "@tanstack/react-query";

export function useCheckReviewed(restId: string, options?: { enabled: boolean }) {
    return useQuery<boolean>({
        queryFn: () => {
            return baseFetch(`/api/user/check-reviewed/${restId}`);
        },
        queryKey: ["check-reviewed", restId],
        enabled: options?.enabled,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}
