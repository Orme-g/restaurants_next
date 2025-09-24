import * as commentRepo from "../repositories/comment.repo";
import * as usersRepo from "../../user/repositories/users.repo";
import mongoose from "mongoose";
import { TComment } from "../models/comment.types";
import { TNewCommentDTO, TEvaluateCommentDTO } from "../models/comment.validators";

export const runtime = "nodejs";

export async function getTopicComments(topicId: string) {
    return commentRepo.getCommentsByTopicId(topicId);
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

export async function postNewComment(data: TNewCommentDTO, userId: string) {
    const session = await mongoose.startSession();
    try {
        let newComment;
        await session.withTransaction(async () => {
            try {
                newComment = await commentRepo.saveNewComment({ ...data, userId }, session);
            } catch {
                throw new Error("Не удалось сохранить комментарий.");
            }
            try {
                await usersRepo.updateUserCommentsField(userId, session);
            } catch {
                throw new Error("Не удалось обновить данные пользователя.");
            }
        });
        return newComment;
    } catch (error) {
        throw error;
    } finally {
        await session.endSession();
    }
}

export async function evaluateComment(
    data: TEvaluateCommentDTO,
    userId: string
): Promise<TComment> {
    const session = await mongoose.startSession();
    try {
        const { action, commentId, authorId } = data;
        const result = await session.withTransaction(async () => {
            let updatedComment;
            try {
                switch (action) {
                    case "like":
                        updatedComment = await commentRepo.increaseCommentLikes(commentId, session);
                        if (!updatedComment) {
                            throw new Error("Комментарий не найден в базе.");
                        }
                        await usersRepo.updateUserRating(authorId, 1, session);
                        break;
                    case "dislike":
                        updatedComment = await commentRepo.increaseCommentDislikes(
                            commentId,
                            session
                        );
                        if (!updatedComment) {
                            throw new Error("Комментарий не найден в базе.");
                        }
                        await usersRepo.updateUserRating(authorId, -1, session);
                        break;
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
