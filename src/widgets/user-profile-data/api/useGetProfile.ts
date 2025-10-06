import { baseFetch } from "@/shared/api/baseFetch";
import { useQuery } from "@tanstack/react-query";

import type { IUserProfileDTO } from "@/entities/user/models/user.types";

export function useGetProfile() {
    return useQuery<IUserProfileDTO>({
        queryKey: ["profile"],
        queryFn: () => baseFetch("/api/user/profile"),
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });
}
