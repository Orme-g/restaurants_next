"use client";
import React, { useState } from "react";
import CommentCard from "@/entities/comment/ui/comment-card/CommentCard";
import AddCommentForm from "@/features/comment/add-comment-form/ui/AddCommentForm";
import { useGetComments } from "../api/useGetComments";
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
    const userData = useAuthStore((state) => state.userData);
    const userId = userData?.id;
    const {
        data: comments,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useGetComments(topicId, 10);
    const { data: userRatedComments } = useGetUserRatedComments(userId);

    if (!comments || isLoading) {
        return;
    }
    return (
        <>
            <section className={styles["comments__container"]}>
                <div className={styles["comments__add"]}>
                    <div className={styles["comments__add-title"]}>Оставить комментарий: </div>
                    <AddCommentForm
                        topicId={topicId}
                        replyData={replyData}
                        setReplyData={setReplyData}
                    />
                </div>
                <div className={styles["comments__title"]}>Комментарии:</div>
                {comments.pages[0].length === 0 ? (
                    "Комментариев пока нет. Оставьте первый!"
                ) : (
                    <div className={styles["comments__list"]}>
                        {comments.pages.flat().map((item) => {
                            const isRated = userRatedComments.includes(item._id);
                            return (
                                <CommentCard
                                    commentData={item}
                                    key={item._id}
                                    setReplyData={setReplyData}
                                    isRated={isRated}
                                    topicId={topicId}
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
