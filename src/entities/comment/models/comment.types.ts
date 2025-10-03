import type { TCommentSchema } from "./comment.schema";
export type TComment = Omit<TCommentSchema, "userId" | "topic" | "replyToComment"> & {
    _id: string;
    userId: string;
    topic: string;
    replyToComment?: string;
};
export type TCommentWithReply = TComment & {
    replyToName?: string;
    replyText?: string;
};
export type TCommentPopulate = Omit<TComment, "replyToComment"> & {
    replyToComment?: {
        _id: string;
        text: string;
        name: string;
    };
};
export type TCommentDTO = TComment & {
    replyText?: string;
    replyToName?: string;
};
