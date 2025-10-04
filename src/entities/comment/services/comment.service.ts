import * as commentRepo from "../repositories/comment.repo";
import * as usersRepo from "../../user/repositories/users.repo";
import mongoose from "mongoose";
import { TCommentDTO } from "../models/comment.types";
import {
    TNewCommentDTO,
    TEvaluateCommentDTO,
    TDeleteCommentDTO,
} from "../models/comment.validators";

export const runtime = "nodejs";

export async function getTopicComments(topicId: string, commentsNumber: number, cursor?: string) {
    return commentRepo.getTopicCommentsWithReplies(topicId, commentsNumber, cursor);
}
// export async function getTopicCommentsWithUserReactionFlag(topicId: string, userId: string) {
//     const topicComments = await commentRepo.getCommentsByTopicId(topicId);
//     const ratedComments = await usersRepo.getUserRatedComments(userId);
//     let result;
//     if (ratedComments) {
//         const ratedSet = new Set(ratedComments.map((item) => item.toString()));
//         result = topicComments.map((item) => {
//             return { ...item, isRated: ratedSet.has(item._id.toString()) };
//         });
//     }
//     return result;
// }

export async function postNewComment(data: TNewCommentDTO, userId: string): Promise<TCommentDTO> {
    const session = await mongoose.startSession();
    try {
        const result = await session.withTransaction(async () => {
            const savedComment = await commentRepo.saveNewComment({ ...data, userId }, session);
            const populatedComment = await commentRepo.getSingleCommentWithReply(
                savedComment._id,
                session
            );
            await usersRepo.updateUserCommentsField(userId, session);
            if (!populatedComment) {
                throw new Error("Не удалось создать новый комментарий.");
            }
            return populatedComment;
        });
        return result;
    } catch (error) {
        throw error;
    } finally {
        await session.endSession();
    }
}

export async function evaluateComment(
    data: TEvaluateCommentDTO,
    userId: string
): Promise<TCommentDTO> {
    const session = await mongoose.startSession();
    try {
        const { action, commentId, authorId } = data;
        const result = await session.withTransaction(async () => {
            let updatedComment;
            try {
                switch (action) {
                    case "like":
                        await commentRepo.increaseCommentLikes(commentId, session);
                        await usersRepo.updateUserRating(authorId, 1, session);
                        break;
                    case "dislike":
                        await commentRepo.increaseCommentDislikes(commentId, session);
                        await usersRepo.updateUserRating(authorId, -1, session);
                        break;
                }
                updatedComment = await commentRepo.getSingleCommentWithReply(commentId, session);
                if (!updatedComment) {
                    throw new Error("Комментарий не найден в базе.");
                }
            } catch {
                throw new Error("Не удалось поставить реакцию.");
            }
            try {
                await usersRepo.addRatedComment(userId, commentId, session);
            } catch {
                throw new Error("Не обновить данные пользователя.");
            }
            return updatedComment;
        });
        return result;
    } catch (error) {
        throw error;
    } finally {
        await session.endSession();
    }
}

export async function deleteComment(data: TDeleteCommentDTO) {
    return commentRepo.updateCommentAsDeleted(data);
}
