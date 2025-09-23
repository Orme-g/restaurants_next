import { baseFetch } from "@/shared/api/baseFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useInteractive } from "@/shared/store/interactive.store";
import type { TNewCommentDTO } from "@/entities/comment/models/comment.validators";

export function usePostComment() {
    const queryClient = useQueryClient();
    const callSnackbar = useInteractive((state) => state.callSnackbar);
    return useMutation({
        mutationFn: (body: TNewCommentDTO) =>
            baseFetch("/api/comments/post-comment", { method: "POST", body: JSON.stringify(body) }),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`topic-comments`, variables.topic] });
            callSnackbar({ text: "Комментарий успешно добавлен", type: "success" });
        },
        onError: () => callSnackbar({ text: "Ошибка добавления комментария", type: "error" }),
    });
}
