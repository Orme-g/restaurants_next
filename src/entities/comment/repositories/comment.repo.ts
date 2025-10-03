"server only";

import Comment from "../models/comment.schema";
import { Types } from "mongoose";
import type {
    TComment,
    TCommentWithReply,
    TCommentPopulate,
    TCommentDTO,
} from "../models/comment.types";
import type { TNewCommentDTO, TDeleteCommentDTO } from "../models/comment.validators";
type TNewCommentWithUserId = TNewCommentDTO & { userId: string };
import type { ClientSession } from "mongoose";

export async function getSingleCommentWithReply(
    commentId: string,
    session?: ClientSession
): Promise<TCommentDTO | null> {
    const comment = await Comment.findById(commentId)
        .session(session ?? null)
        .populate("replyToComment", "text name")
        .lean<TCommentPopulate>();
    if (!comment) return null;
    return {
        ...comment,
        replyToComment: comment.replyToComment?._id,
        replyText: comment.replyToComment?.text,
        replyToName: comment.replyToComment?.name,
    };
}
export async function getTopicCommentsWithReplies(
    topicId: string,
    commentsNumber: number,
    lastId?: string
): Promise<TCommentWithReply[]> {
    const matchConditions = lastId
        ? { topic: new Types.ObjectId(topicId), _id: { $lt: new Types.ObjectId(lastId) } }
        : { topic: new Types.ObjectId(topicId) };
    return Comment.aggregate<TCommentWithReply>([
        {
            $match: matchConditions,
        },
        {
            $sort: { _id: -1 },
        },
        {
            $limit: commentsNumber,
        },
        {
            $lookup: {
                from: "comments",
                localField: "replyToComment",
                foreignField: "_id",
                as: "replyData",
            },
        },
        {
            $unwind: {
                path: "$replyData",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $project: {
                _id: 1,
                text: 1,
                name: 1,
                topic: 1,
                userId: 1,
                likes: 1,
                dislikes: 1,
                deleted: 1,
                createdAt: 1,
                updatedAt: 1,
                replyToComment: "$replyData._id",
                replyText: "$replyData.text",
                replyToName: "$replyData.name",
            },
        },
    ]);
}

export async function saveNewComment(
    data: TNewCommentWithUserId,
    session?: ClientSession
): Promise<TComment> {
    const newComment = new Comment(data);
    const saved = await newComment.save({ session });
    return saved.toObject();
}

export async function increaseCommentLikes(
    commentId: string,
    session?: ClientSession
): Promise<TComment | null> {
    return Comment.findByIdAndUpdate(
        commentId,
        { $inc: { likes: 1 } },
        { session, new: true }
    ).lean<TComment>();
}

export async function increaseCommentDislikes(
    commentId: string,
    session?: ClientSession
): Promise<TComment | null> {
    return Comment.findByIdAndUpdate(
        commentId,
        { $inc: { dislikes: 1 } },
        { session, new: true }
    ).lean<TComment>();
}

export async function updateCommentAsDeleted(data: TDeleteCommentDTO): Promise<TComment | null> {
    const { commentId, reason } = data;
    return Comment.findByIdAndUpdate(
        commentId,
        { $set: { deleted: true, text: reason } },
        { new: true }
    ).lean<TComment>();
}
