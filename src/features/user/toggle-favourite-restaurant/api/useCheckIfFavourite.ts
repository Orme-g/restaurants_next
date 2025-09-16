import { useQuery } from "@tanstack/react-query";
import { baseFetch } from "@/shared/api/baseFetch";

export function useCheckIfFavourite(restId: string, options?: { enabled: boolean }) {
    return useQuery<boolean>({
        queryFn: () => baseFetch(`/api/user/check-favourite/${restId}`),
        queryKey: ["favourite", restId],
        enabled: options?.enabled,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}
