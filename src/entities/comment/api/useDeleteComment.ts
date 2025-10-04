import { baseFetch } from "@/shared/api/baseFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useInteractive } from "@/shared/store/interactive.store";
import type { TComment } from "@/entities/comment/models/comment.types";
import type { TDeleteCommentDTO } from "@/entities/comment/models/comment.validators";

export function useDeleteComment(topicId: string) {
    const queryClient = useQueryClient();
    const callSnackbar = useInteractive((state) => state.callSnackbar);
    return useMutation<TComment, Error, TDeleteCommentDTO>({
        mutationFn: (body) =>
            baseFetch("/api/comments/delete-comment", {
                method: "PATCH",
                body: JSON.stringify(body),
            }),
        onError: () => callSnackbar({ text: "Ошибка удаления", type: "error" }),
        onSuccess: () => {
            callSnackbar({ text: "Комментарий удалён", type: "success" });
            queryClient.invalidateQueries({ queryKey: ["topic-comments", topicId] });
        },
    });
}
