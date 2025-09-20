"use client";
import { baseFetch } from "@/shared/api/baseFetch";
import { useQuery } from "@tanstack/react-query";
import type { TComment } from "@/entities/comment/models/comment.types";

export function useGetComments(topicId: string) {
    return useQuery<TComment[]>({
        queryFn: () => baseFetch(`/api/comments/topic-comments/${topicId}`),
        queryKey: [`topic-comments`, topicId],
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });
}
