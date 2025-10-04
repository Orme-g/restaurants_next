import { baseFetch } from "@/shared/api/baseFetch";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { useInteractive } from "@/shared/store/interactive.store";
import type { TNewCommentDTO } from "@/entities/comment/models/comment.validators";
import type { TCommentDTO } from "@/entities/comment/models/comment.types";

export function usePostComment() {
    const queryClient = useQueryClient();
    const callSnackbar = useInteractive((state) => state.callSnackbar);
    return useMutation<TCommentDTO, Error, TNewCommentDTO>({
        mutationFn: (body) =>
            baseFetch("/api/comments/post-comment", { method: "POST", body: JSON.stringify(body) }),
        onSuccess: (comment, variables) => {
            queryClient.setQueryData<InfiniteData<TCommentDTO[], unknown>>(
                ["topic-comments", variables.topic],
                (prevData) => {
                    if (!prevData) {
                        return {
                            pages: [[comment]],
                            pageParams: [null],
                        };
                    }
                    const [firstPage, ...restPages] = prevData.pages;
                    return {
                        ...prevData,
                        pages: [[comment, ...firstPage], ...restPages],
                    };
                }
            );
            callSnackbar({ text: "Комментарий успешно добавлен", type: "success" });
        },
        onError: () => callSnackbar({ text: "Ошибка добавления комментария", type: "error" }),
    });
}
