import { baseFetch } from "@/shared/api/baseFetch";
import { useQuery } from "@tanstack/react-query";

export function useGetUserRatedComments(userId: string | undefined) {
    return useQuery({
        queryFn: () => baseFetch<string[] | null>("/api/user/rated-comments"),
        queryKey: ["rated-comments", userId],
        enabled: Boolean(userId),
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });
}
