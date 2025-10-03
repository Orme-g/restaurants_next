"use client";
import React, { useState, useCallback } from "react";
import CommentCard from "@/entities/comment/ui/comment-card/CommentCard";
import AddCommentForm from "@/features/comment/add-comment-form/ui/AddCommentForm";
import { useGetComments } from "../api/useGetComments";
import { useEvaluateComment } from "@/widgets/comments-block/api/useEvaluateComment";
import { useGetUserRatedComments } from "../api/useGetUserRatedComments";
import { usePostComment } from "../api/usePostComment";
import { useDeleteComment } from "../api/useDeleteComment";
import { useAuthStore } from "@/shared/store/auth.store";
import { useInteractive } from "@/shared/store/interactive.store";
import type {
    TEvaluateCommentDTO,
    TDeleteCommentDTO,
} from "@/entities/comment/models/comment.validators";

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
    const isAdmin = userData?.role.includes("admin");
    const {
        data: comments,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useGetComments(topicId, 10);
    const { data: userRatedComments } = useGetUserRatedComments(userId);
    const { mutate: evaluateComment } = useEvaluateComment(topicId);
    const { mutateAsync: postComment, isPending } = usePostComment();
    const { mutate: deleteComment } = useDeleteComment(topicId);
    const callSnackbar = useInteractive((state) => state.callSnackbar);
    const handleReply = useCallback(
        (data: IReplyData | null) => {
            if (!isAuth) {
                callSnackbar({ text: "Войдите, чтобы ответить на комментарий.", type: "warning" });
                return;
            }
            setReplyData(data);
        },
        [isAuth, callSnackbar]
    );
    const handleEvaluate = useCallback(
        (dto: TEvaluateCommentDTO) => {
            if (!isAuth) {
                callSnackbar({ text: "Войдите, чтобы поставить реакцию.", type: "warning" });
                return;
            }
            evaluateComment(dto);
        },
        [evaluateComment, isAuth, callSnackbar]
    );
    const handleDelete = useCallback(
        (dto: TDeleteCommentDTO) => {
            deleteComment(dto);
        },
        [deleteComment]
    );

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
                            postComment={postComment}
                            isPending={isPending}
                        />
                    ) : (
                        <div className={styles["comments__notice"]}>
                            Войдите или зарегистрируйтесь, чтобы оставлять комментарии.
                        </div>
                    )}
                </div>
                <div className={styles["comments__title"]}>Комментарии:</div>
                {comments.pages[0].length === 0 ? (
                    "Комментариев пока нет. Оставьте первый!"
                ) : (
                    <div className={styles["comments__list"]}>
                        {comments.pages.flat().map((item) => {
                            if (userRatedComments) {
                                const isRated = userRatedComments.includes(item._id);
                                return (
                                    <CommentCard
                                        isAdmin={Boolean(isAdmin)}
                                        commentData={item}
                                        key={item._id}
                                        handleReply={handleReply}
                                        isRated={isRated}
                                        topicId={topicId}
                                        evaluateComment={handleEvaluate}
                                        handleDelete={handleDelete}
                                    />
                                );
                            }
                            return (
                                <CommentCard
                                    isAdmin={Boolean(isAdmin)}
                                    commentData={item}
                                    key={item._id}
                                    handleReply={handleReply}
                                    topicId={topicId}
                                    evaluateComment={handleEvaluate}
                                    handleDelete={handleDelete}
                                />
                            );
                        })}
                        <button
                            disabled={!hasNextPage || isFetchingNextPage}
                            className={styles["comments__load-button"]}
                            onClick={() => fetchNextPage()}
                        >
                            {isFetchingNextPage ? "Идёт загрузка..." : "Загрузить ещё"}
                        </button>
                    </div>
                )}
            </section>
        </>
    );
};
export default CommentsBlock;
