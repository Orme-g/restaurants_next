import { baseFetch } from "@/shared/api/baseFetch";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/shared/store/auth.store";

import type { TEvaluateCommentDTO } from "@/entities/comment/models/comment.validators";
import { TCommentWithReply } from "@/entities/comment/models/comment.types";

export function useEvaluateComment(topicId: string) {
    const userData = useAuthStore((state) => state.userData);
    const userId = userData?.id;
    const queryClient = useQueryClient();
    return useMutation<
        TCommentWithReply,
        Error,
        TEvaluateCommentDTO,
        { prevRatedComments?: string[]; prevData?: InfiniteData<TCommentWithReply[], unknown> }
    >({
        mutationFn: (body) =>
            baseFetch("/api/comments/evaluate-comment", {
                method: "POST",
                body: JSON.stringify(body),
            }),
        onMutate: (variables) => {
            const { action, commentId } = variables;
            const prevRatedComments = queryClient.getQueryData<string[]>([
                "rated-comments",
                userId,
            ]);
            const prevData = queryClient.getQueryData<InfiniteData<TCommentWithReply[], unknown>>([
                "topic-comments",
                topicId,
            ]);
            const newRatedComments = [...(prevRatedComments ?? []), commentId];
            if (prevData) {
                const newData = {
                    ...prevData,
                    pages: prevData.pages.map((page) =>
                        page.map((item) =>
                            item._id === commentId
                                ? {
                                      ...item,
                                      likes: action === "like" ? item.likes + 1 : item.likes,
                                      dislikes:
                                          action === "dislike" ? item.dislikes + 1 : item.dislikes,
                                  }
                                : item
                        )
                    ),
                };
                queryClient.setQueryData(["topic-comments", topicId], newData);
            }
            queryClient.setQueryData(["rated-comments", userId], newRatedComments);

            return { prevRatedComments, prevData };
        },
        onError: (_error, _variables, context) => {
            if (context?.prevRatedComments !== undefined && context?.prevData !== undefined) {
                queryClient.setQueryData(["rated-comments", userId], context.prevRatedComments);
                queryClient.setQueryData(["topic-comments", topicId], context.prevData);
            }
        },
        onSuccess: (updatedComment: TCommentWithReply) => {
            queryClient.setQueryData<InfiniteData<TCommentWithReply[], unknown>>(
                ["topic-comments", topicId],
                (prevData) => {
                    if (!prevData) return prevData;
                    return {
                        ...prevData,
                        pages: prevData.pages.map((page) =>
                            page.map((item) =>
                                item._id === updatedComment._id ? updatedComment : item
                            )
                        ),
                    };
                }
            );
            queryClient.setQueryData<string[]>(["rated-comments", userId], (prevList) =>
                prevList ? [...prevList, updatedComment._id] : []
            );
        },
    });
}
