import { z } from "zod";

export const newCommentSchema = z.object({
    name: z.string(),
    topic: z.string(),
    text: z.string(),
    replyToComment: z.string().optional(),
});

export type TNewCommentDTO = z.infer<typeof newCommentSchema>;

export const evaluateCommentSchema = z.object({
    commentId: z.string(),
    action: z.enum(["like", "dislike"]),
    authorId: z.string(),
});

export type TEvaluateCommentDTO = z.infer<typeof evaluateCommentSchema>;

export const deleteCommentSchema = z.object({
    commentId: z.string(),
    reason: z.string(),
});

export type TDeleteCommentDTO = z.infer<typeof deleteCommentSchema>;
