import { baseFetch } from "@/shared/api/baseFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
        { prevRatedComments?: string[]; prevTopicComments?: TCommentWithReply[] }
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
            const prevTopicComments = queryClient.getQueryData<TCommentWithReply[]>([
                "topic-comments",
                topicId,
            ]);
            const newRatedComments = [...(prevRatedComments ?? []), commentId];
            const newTopicComments = prevTopicComments
                ? prevTopicComments.map((item) => {
                      if (item._id === commentId) {
                          switch (action) {
                              case "like":
                                  return { ...item, likes: item.likes + 1 };
                              case "dislike":
                                  return { ...item, dislikes: item.dislikes + 1 };
                          }
                      } else {
                          return item;
                      }
                  })
                : [];
            queryClient.setQueryData(["rated-comments", userId], newRatedComments);
            queryClient.setQueryData(["topic-comments", topicId], newTopicComments);
            return { prevRatedComments, prevTopicComments };
        },
        onError: (_error, _variables, context) => {
            if (
                context?.prevRatedComments !== undefined &&
                context?.prevTopicComments !== undefined
            ) {
                queryClient.setQueryData(["rated-comments", userId], context.prevRatedComments);
                queryClient.setQueryData(["topic-comments", topicId], context.prevTopicComments);
            }
        },
        onSuccess: (updatedComment: TCommentWithReply) => {
            queryClient.setQueryData<TCommentWithReply[]>(["topic-comments", topicId], (prevList) =>
                prevList
                    ? prevList.map((item) =>
                          item._id === updatedComment._id
                              ? updatedComment
                              : //   ? {
                                //         ...updatedComment,
                                //         replyText: item.replyText,
                                //         replyToName: item.replyToName,
                                //     }
                                item
                      )
                    : []
            );
            queryClient.setQueryData<string[]>(["rated-comments", userId], (prevList) =>
                prevList ? [...prevList, updatedComment._id] : []
            );
        },
    });
}
