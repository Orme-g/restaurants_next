"server only";

import Comment from "../models/comment.schema";
import type { TComment } from "../models/comment.types";
import type { TNewCommentDTO } from "../models/comment.validators";
type TNewCommentWithUserId = TNewCommentDTO & { userId: string };
import type { ClientSession } from "mongoose";

export async function getCommentsByTopicId(topicId: string): Promise<TComment[]> {
    return Comment.find({ topic: topicId }).sort({ createdAt: -1 }).lean<TComment[]>();
}

export async function saveNewComment(
    data: TNewCommentWithUserId,
    session?: ClientSession
): Promise<TComment> {
    const newComment = new Comment(data);
    const saved = await newComment.save({ session });
    return saved.toObject();
}

export async function increaseCommentLikes(commentId: string, session?: ClientSession) {
    return Comment.findByIdAndUpdate(
        commentId,
        { $inc: { likes: 1 } },
        { session, new: true }
    ).lean();
}

export async function increaseCommentDislikes(commentId: string, session?: ClientSession) {
    return Comment.findByIdAndUpdate(
        commentId,
        { $inc: { dislikes: 1 } },
        { session, new: true }
    ).lean();
}
