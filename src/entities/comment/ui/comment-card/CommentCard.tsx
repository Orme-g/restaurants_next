"use client";
import React, { useState, memo } from "react";
import { IconButton, Badge, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faXmark, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { useEvaluateComment } from "../../api/useEvaluateComment";
import { useDeleteComment } from "../../api/useDeleteComment";
import { useAuthStore } from "@/shared/store/auth.store";
import { useInteractive } from "@/shared/store/interactive.store";
import DeleteCommentForm from "./DeleteCommentForm";
import transformDate from "@/shared/lib/transfromDate";
import styles from "./CommentCard.module.scss";
import type { TCommentWithReply } from "../../models/comment.types";
import type { IReplyData } from "@/widgets/comments-block/ui/CommentsBlock";
import type { TEvaluateCommentDTO } from "../../models/comment.validators";

interface ICommentCardProps {
    commentData: TCommentWithReply;
    setReplyData: (data: IReplyData) => void;
    topicId: string;
    isRated?: boolean;
}
const CommentCard: React.FC<ICommentCardProps> = ({
    commentData,
    setReplyData,
    isRated,
    topicId,
}) => {
    const [displayDeleteForm, setDisplayDeleteForm] = useState<boolean>(false);
    const { _id, name, likes, dislikes, createdAt, text, userId, replyText, replyToName, deleted } =
        commentData;
    const { isAuth, userData } = useAuthStore();
    const callSnackbar = useInteractive((state) => state.callSnackbar);
    const isAdmin = userData?.role.includes("admin");
    const { mutate: evaluateComment } = useEvaluateComment(topicId);
    const { mutate: deleteComment } = useDeleteComment(topicId);
    function handleEvaluate(data: TEvaluateCommentDTO) {
        if (!isAuth) {
            callSnackbar({ text: "Войдите, чтобы поставить реакцию.", type: "warning" });
            return;
        }
        evaluateComment(data);
    }
    function handleReply(data: IReplyData) {
        if (!isAuth) {
            callSnackbar({ text: "Войдите, чтобы ответить на комментарий.", type: "warning" });
            return;
        }
        setReplyData(data);
    }
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
                            handleEvaluate({
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
                            handleEvaluate({
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
                    handleDelete={deleteComment}
                />
            ) : null}
        </div>
    );
};
export default memo(CommentCard);
