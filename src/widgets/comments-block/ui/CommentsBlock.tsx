"use client";
import React from "react";
import CommentCard from "@/entities/comment/ui/comment-card/CommentCard";
import AddCommentForm from "@/features/comment/add-comment-form/AddCommentForm";
import { useGetComments } from "../api/useGetComments";
import { useAuthStore } from "@/shared/store/auth.store";
import styles from "./CommentsBlock.module.scss";
interface ICommentsBlockProps {
    topicId: string;
}

const CommentsBlock: React.FC<ICommentsBlockProps> = ({ topicId }) => {
    const { data: comments, isLoading } = useGetComments(topicId);
    const { isAuth } = useAuthStore();
    if (!comments || isLoading) {
        return;
    }
    return (
        <>
            <section className={styles["comments__container"]}>
                <div className={styles["comments__add"]}>
                    <div className={styles["comments__add-title"]}>Оставить комментарий: </div>
                    {isAuth ? (
                        <AddCommentForm topicId={topicId} />
                    ) : (
                        <div className={styles["comments__notice"]}>
                            Войдите или зарегистрируйтесь, чтобы оставлять комментарии.
                        </div>
                    )}
                </div>
                <div className={styles["comments__title"]}>Комментарии:</div>
                <div className={styles["comments__list"]}>
                    {comments.map((item, index) => {
                        return <CommentCard data={item} key={index} />;
                    })}
                </div>
            </section>
        </>
    );
};
export default CommentsBlock;
