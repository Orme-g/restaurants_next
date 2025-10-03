"use client";
import { baseFetch } from "@/shared/api/baseFetch";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { TCommentWithReply } from "@/entities/comment/models/comment.types";

export function useGetComments(topicId: string, commentsNumber: number) {
    return useInfiniteQuery<TCommentWithReply[], Error>({
        queryKey: ["topic-comments", topicId],
        queryFn: async ({ pageParam }) => {
            const cursor = pageParam as string | undefined;
            const url = cursor
                ? `/api/comments/topic-comments/${topicId}?comments-number=${commentsNumber}&cursor=${cursor}`
                : `/api/comments/topic-comments/${topicId}?comments-number=${commentsNumber}`;
            return baseFetch(url);
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.length < commentsNumber) return undefined;
            return lastPage[lastPage.length - 1]?._id;
        },
        initialPageParam: null,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });
}
