import { baseFetch } from "@/shared/api/baseFetch";
import { useMutation } from "@tanstack/react-query";

import type { TEvaluateCommentDTO } from "../models/comment.validators";

export function useEvaluateComment() {
    return useMutation({
        mutationFn: (body: TEvaluateCommentDTO) =>
            baseFetch("/api/comments/evaluate-comment", {
                method: "POST",
                body: JSON.stringify(body),
            }),
    });
}
