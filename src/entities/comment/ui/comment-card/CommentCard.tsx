"use client";
import React, { useState } from "react";
import { IconButton, Badge, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import DeleteCommentForm from "./DeleteCommentForm";
import transformDate from "@/shared/lib/transfromDate";
import { useEvaluateComment } from "../../api/useEvaluateComment";
import styles from "./CommentCard.module.scss";
import type { TComment } from "../../models/comment.types";
import type { IReplyData } from "@/widgets/comments-block/ui/CommentsBlock";

interface ICommentCardProps {
    data: TComment;
    isAdmin?: boolean;
    handleReply: (data: IReplyData) => void;
}
const CommentCard: React.FC<ICommentCardProps> = ({ data, handleReply }) => {
    const [displayDeleteForm, setDisplayDeleteForm] = useState<boolean>(false);
    const { _id, name, likes, dislikes, createdAt, text, userId } = data;
    const { mutate: evaluateComment } = useEvaluateComment();
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
    // function handleDisplayForm() {
    //     setDisplayDeleteForm((display) => !display);
    // }
    return (
        <div className={styles["comment-card__container"]} key={_id}>
            {deleteButton}
            <div className={styles["comment-card__header"]}>
                <div className={styles["comment-card__name"]}>{name}</div>
                {/* {isAdmin ? (
                    <div className="comment-card__delete">
                        <IconButton onClick={() => setDisplayDeleteWindow(true)}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </IconButton>
                    </div>
                ) : null} */}
            </div>
            <div className={styles["comment-card__text"]}>
                {/* {deleted ? commentDeleted : replyToComment ? commentWithReply : text} */}
                {text}
            </div>
            <div className={styles["comment-card__footer"]}>
                <div className={styles["comment-card__like"]}>
                    <IconButton
                        // disabled={beingRated || deleted}
                        onClick={() =>
                            evaluateComment({
                                commentId: _id,
                                action: "like",
                                authorId: userId.toString(),
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
                        // disabled={beingRated || deleted}
                        onClick={() =>
                            evaluateComment({
                                commentId: _id,
                                action: "dislike",
                                authorId: userId.toString(),
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
                    // disabled={deleted}
                >
                    Ответить
                </Button>
                <div className={styles["comment-card__date"]}>
                    {transformDate(createdAt, "short")}
                </div>
            </div>
            {displayDeleteForm ? (
                <DeleteCommentForm
                    isDisplayed={displayDeleteForm}
                    setDisplayForm={setDisplayDeleteForm}
                    commentId={_id}
                />
            ) : null}
        </div>
    );
};
export default CommentCard;
