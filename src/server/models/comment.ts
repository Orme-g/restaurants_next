import "server-only";

import { Schema, model, models } from "mongoose";

const commentSchema = new Schema(
    {
        name: {
            type: String,
            default: "Гость",
        },
        userId: String,
        topic: String,
        likes: Number,
        dislikes: Number,
        text: String,
        replyToComment: String,
        deleted: Boolean,
    },
    { timestamps: true }
);

const Comment = models.Comment || model("Comment", commentSchema);

export default Comment;
