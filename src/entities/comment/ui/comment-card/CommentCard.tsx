"use client";
import React, { useState, memo } from "react";
import { IconButton, Badge, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faXmark, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import DeleteCommentForm from "./DeleteCommentForm";
import transformDate from "@/shared/lib/transfromDate";
import styles from "./CommentCard.module.scss";
import type { TComment, TCommentWithReply } from "../../models/comment.types";
import type { IReplyData } from "@/widgets/comments-block/ui/CommentsBlock";
import type { TEvaluateCommentDTO, TDeleteCommentDTO } from "../../models/comment.validators";
import type { UseMutateFunction } from "@tanstack/react-query";

interface ICommentCardProps {
    isAdmin: boolean;
    commentData: TCommentWithReply;
    handleReply: (data: IReplyData) => void;
    topicId: string;
    isRated?: boolean;
    evaluateComment: UseMutateFunction<TCommentWithReply, Error, TEvaluateCommentDTO>;
    handleDelete: UseMutateFunction<TComment, Error, TDeleteCommentDTO>;
}
const CommentCard: React.FC<ICommentCardProps> = ({
    isAdmin,
    commentData,
    handleReply,
    isRated,
    evaluateComment,
    handleDelete,
}) => {
    const [displayDeleteForm, setDisplayDeleteForm] = useState<boolean>(false);
    const { _id, name, likes, dislikes, createdAt, text, userId, replyText, replyToName, deleted } =
        commentData;
    const commentWithReply = (
        <>
            <div className={styles["comment-card__reply"]}>
                <FontAwesomeIcon
                    icon={faQuoteRight}
                    style={{
                        position: "absolute",
                        top: "5px",
                        right: "10px",
                        height: "18px",
                        width: "18px",
                    }}
                />
                <div className={styles["comment-card__reply_name"]}>{replyToName}</div>
                <div className={styles["comment-card__reply_text"]}>{replyText}</div>
            </div>
            {text}
        </>
    );
    const commentDeleted = (
        <div className={styles["comment-card__deleted"]}>
            <div className={styles["comment-card__deleted_title"]}>
                Комментарий удалён. Причина:
            </div>
            <div className={styles["comment-card__deleted_reason"]}>{text}</div>
        </div>
    );
    const deleteButton = (
        <div
            className={styles["comment-card__delete"]}
            onClick={() => setDisplayDeleteForm((display) => !display)}
        >
            <IconButton>
                <FontAwesomeIcon icon={faXmark} style={{ height: "22px", width: "22px" }} />
            </IconButton>
        </div>
    );
    return (
        <div className={styles["comment-card__container"]} key={_id}>
            {isAdmin ? deleteButton : null}
            <div className={styles["comment-card__header"]}>
                <div className={styles["comment-card__name"]}>{name}</div>
            </div>
            <div className={styles["comment-card__text"]}>
                {deleted ? commentDeleted : replyText && replyToName ? commentWithReply : text}
            </div>
            <div className={styles["comment-card__footer"]}>
                <div className={styles["comment-card__like"]}>
                    <IconButton
                        disabled={isRated || deleted}
                        onClick={() =>
                            evaluateComment({
                                commentId: _id,
                                action: "like",
                                authorId: userId,
                            })
                        }
                    >
                        <Badge
                            badgeContent={likes}
                            color="success"
                            sx={{
                                "& .MuiBadge-badge": {
                                    fontSize: {
                                        xs: "0.6rem",
                                        sm: "0.7rem",
                                        md: "0.9rem",
                                    },
                                },
                            }}
                        >
                            <FontAwesomeIcon icon={faThumbsUp} />
                        </Badge>
                    </IconButton>
                </div>
                <div className={styles["comment-card__dislike"]}>
                    <IconButton
                        disabled={isRated || deleted}
                        onClick={() =>
                            evaluateComment({
                                commentId: _id,
                                action: "dislike",
                                authorId: userId,
                            })
                        }
                    >
                        <Badge
                            badgeContent={-dislikes}
                            color="error"
                            sx={{
                                "& .MuiBadge-badge": {
                                    fontSize: {
                                        xs: "0.6rem",
                                        sm: "0.7rem",
                                        md: "0.9rem",
                                    },
                                },
                            }}
                        >
                            <FontAwesomeIcon icon={faThumbsDown} />
                        </Badge>
                    </IconButton>
                </div>
                <Button
                    sx={{
                        color: "#494949",
                        fontStyle: "italic",
                        "@media(max-width: 480px)": {
                            fontSize: "10px",
                        },
                    }}
                    onClick={() => handleReply({ name, text, commentId: _id })}
                    disabled={deleted}
                >
                    Ответить
                </Button>
                <div className={styles["comment-card__date"]}>
                    {transformDate(createdAt, "short")}
                </div>
            </div>
            {displayDeleteForm ? (
                <DeleteCommentForm
                    setDisplayForm={setDisplayDeleteForm}
                    commentId={_id}
                    handleDelete={handleDelete}
                />
            ) : null}
        </div>
    );
};
export default memo(CommentCard);
