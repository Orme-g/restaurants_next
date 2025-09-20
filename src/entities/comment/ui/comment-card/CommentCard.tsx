"use client";
import React, { useState } from "react";
import { IconButton, Badge, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import DeleteCommentForm from "./DeleteCommentForm";
import transformDate from "@/shared/lib/transfromDate";
import styles from "./CommentCard.module.scss";
import type { TComment } from "../../models/comment.types";

interface ICommentCardProps {
    data: TComment;
    isAdmin?: boolean;
}
const CommentCard: React.FC<ICommentCardProps> = ({ data }) => {
    const [displayDeleteForm, setDisplayDeleteForm] = useState<boolean>(false);
    const { _id, name, likes, dislikes, createdAt, text } = data;
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
                {/* <div className={styles["comment-card__avatar"]}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        alt="user_avatar"
                    />
                </div> */}

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
                    // onClick={() => handleEvaluateComment(_id, "like")}
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
                    // onClick={() => handleEvaluateComment(_id, "dislike")}
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
                    // onClick={() => commentReply({ name, text, commentId: _id })}
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
                    commentId="123123"
                />
            ) : null}
        </div>
    );
};
export default CommentCard;
