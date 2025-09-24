import { baseFetch } from "@/shared/api/baseFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/shared/store/auth.store";

import type { TEvaluateCommentDTO } from "@/entities/comment/models/comment.validators";

export function useEvaluateComment(topicId: string) {
    console.log("Evaluation hooked");
    const userData = useAuthStore((state) => state.userData);
    const userId = userData?.id;
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (body: TEvaluateCommentDTO) =>
            baseFetch("/api/comments/evaluate-comment", {
                method: "POST",
                body: JSON.stringify(body),
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["rated-comments", userId] });
            queryClient.invalidateQueries({ queryKey: ["topic-comments", topicId] });
        },
    });
}
