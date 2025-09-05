import "server-only";

import { Schema, model, models, InferSchemaType } from "mongoose";

const commentSchema = new Schema(
    {
        name: {
            type: String,
            default: "Гость",
            required: true,
        },
        userId: { type: String, required: true },
        topic: { type: String, required: true },
        likes: { type: Number, required: true },
        dislikes: { type: Number, required: true },
        text: { type: String, required: true },
        replyToComment: String,
        deleted: Boolean,
    },
    { timestamps: true }
);

export type TCommentSchema = InferSchemaType<typeof commentSchema>;

const Comment = models.Comment || model("Comment", commentSchema);

export default Comment;
