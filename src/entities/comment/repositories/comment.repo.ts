"server only";

import Comment from "../models/comment.schema";
import type { TComment } from "../models/comment.types";

export async function getCommentsByTopicId(topicId: string): Promise<TComment[]> {
    return Comment.find({ topic: topicId }).sort({ createdAt: -1 }).lean<TComment[]>();
}
