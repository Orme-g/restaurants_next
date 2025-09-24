"use client";
import React, { useState } from "react";
import CommentCard from "@/entities/comment/ui/comment-card/CommentCard";
import AddCommentForm from "@/features/comment/add-comment-form/ui/AddCommentForm";
import { useGetComments } from "../api/useGetComments";
import { useEvaluateComment } from "@/widgets/comments-block/api/useEvaluateComment";
import { useGetUserRatedComments } from "../api/useGetUserRatedComments";
import { useAuthStore } from "@/shared/store/auth.store";
import styles from "./CommentsBlock.module.scss";

export interface IReplyData {
    text: string;
    commentId: string;
    name: string;
}

interface ICommentsBlockProps {
    topicId: string;
}

const CommentsBlock: React.FC<ICommentsBlockProps> = ({ topicId }) => {
    const [replyData, setReplyData] = useState<IReplyData | null>(null);
    const { isAuth, userData } = useAuthStore();
    const userId = userData?.id;
    const { data: comments, isLoading } = useGetComments(topicId);
    const { data: userRatedComments } = useGetUserRatedComments(userId);
    const { mutate: evaluateComment } = useEvaluateComment(topicId);
    console.log(comments);
    console.log(userRatedComments);
    function handleReply(data: IReplyData | null) {
        setReplyData(data);
    }
    if (!comments || isLoading) {
        return;
    }
    return (
        <>
            <section className={styles["comments__container"]}>
                <div className={styles["comments__add"]}>
                    <div className={styles["comments__add-title"]}>Оставить комментарий: </div>
                    {isAuth ? (
                        <AddCommentForm
                            topicId={topicId}
                            replyData={replyData}
                            handleReply={handleReply}
                        />
                    ) : (
                        <div className={styles["comments__notice"]}>
                            Войдите или зарегистрируйтесь, чтобы оставлять комментарии.
                        </div>
                    )}
                </div>
                <div className={styles["comments__title"]}>Комментарии:</div>
                <div className={styles["comments__list"]}>
                    {comments.map((item, index) => {
                        if (userRatedComments) {
                            const isRated = userRatedComments.includes(item._id);
                            return (
                                <CommentCard
                                    commentData={item}
                                    key={index}
                                    handleReply={handleReply}
                                    isRated={isRated}
                                    topicId={topicId}
                                    evaluateComment={evaluateComment}
                                />
                            );
                        }
                        return (
                            <CommentCard
                                commentData={item}
                                key={index}
                                handleReply={handleReply}
                                topicId={topicId}
                                evaluateComment={evaluateComment}
                            />
                        );
                    })}
                </div>
            </section>
        </>
    );
};
export default CommentsBlock;
