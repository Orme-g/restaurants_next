import "server-only";

import { Schema, model, models, InferSchemaType } from "mongoose";

const commentSchema = new Schema(
    {
        name: {
            type: String,
            default: "Гость",
            required: true,
        },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        topic: { type: Schema.Types.ObjectId, ref: "Article", required: true },
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 },
        text: { type: String, required: true },
        replyToComment: { type: Schema.Types.ObjectId, ref: "Comment", required: false },
        deleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export type TCommentSchema = InferSchemaType<typeof commentSchema>;

const Comment = models.Comment || model("Comment", commentSchema);

export default Comment;
