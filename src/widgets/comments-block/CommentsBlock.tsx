import React from "react";
import CommentCard from "@/entities/comment/ui/comment-card/CommentCard";
import AddCommentForm from "@/features/comment/add-comment-form/AddCommentForm";
import styles from "./CommentsBlock.module.scss";

const comment = {
    _id: "652e6d861555263d8ca6cbdf",
    name: "Ilya",
    topic: "651d8e2a02b0256dc1e6ba0c",
    likes: 11,
    dislikes: 4,
    text: "Вот оставляю пробный коммент...",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "123123",
};

const CommentsBlock = () => {
    return (
        <>
            <section className={styles["comments__container"]}>
                <div className={styles["comments__add"]}>
                    <div className={styles["comments__add-title"]}>Оставить комментарий: </div>
                    <AddCommentForm topicId="123123" />
                    {/* {isAuth ? (
                        <CommentForm
                            replyData={replyData}
                            topicId={currentTopicId}
                            setReplyData={setReplyData}
                        />
                    ) : (
                        unAuth
                    )} */}
                </div>
                <div className={styles["comments__title"]}>Комментарии:</div>
                <div className={styles["comments__list"]}>
                    <CommentCard data={comment} />
                    <CommentCard data={comment} />
                    <CommentCard data={comment} />
                    {/* {topicComments && topicComments.length > 0 ? displayComments : noComments} */}
                </div>
            </section>
        </>
    );
};
export default CommentsBlock;
