import * as commentRepo from "../repositories/comment.repo";

export const runtime = "nodejs";

export async function getTopicComments(topicId: string) {
    return commentRepo.getCommentsByTopicId(topicId);
}
