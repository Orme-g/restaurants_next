"use client";
import React from "react";
import { useState } from "react";
import { TextField, Button, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "@/shared/store/auth.store";
import { usePostComment } from "../api/usePostComment";
import type { IReplyData } from "@/widgets/comments-block/ui/CommentsBlock";
import type { TNewCommentDTO } from "@/entities/comment/models/comment.validators";
import styles from "./AddCommentForm.module.scss";
interface ICommentFormProps {
    topicId: string;
    replyData: IReplyData | null;
    setReplyData: (data: IReplyData | null) => void;
}
const AddCommentForm: React.FC<ICommentFormProps> = ({ topicId, replyData, setReplyData }) => {
    const [commentText, setCommentText] = useState("");
    const [error, setError] = useState(false);
    const { mutateAsync: postComment, isPending } = usePostComment();
    const isAuth = useAuthStore((state) => state.isAuth);
    const userData = useAuthStore((state) => state.userData);
    if (!userData) {
        return;
    }
    const { name } = userData;
    function handleSubmit() {
        if (commentText.length < 10) {
            setError(true);
            return;
        }

        let newComment: TNewCommentDTO = {
            name,
            topic: topicId,
            text: commentText,
        };
        setError(false);
        if (replyData) {
            newComment = { ...newComment, replyToComment: replyData.commentId };
        }
        postComment(newComment).then(() => {
            setCommentText("");
            setError(false);
            setReplyData(null);
        });
    }
    const replyBlock = (
        <div className={styles["comments-add-form__reply"]}>
            <span>Ответ на:</span>
            <div className={styles["comments-add-form__reply_name"]}>{replyData?.name}</div>
            <div className={styles["comments-add-form__reply_text"]}>{replyData?.text}</div>
            <IconButton
                sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                }}
                onClick={() => setReplyData(null)}
            >
                <FontAwesomeIcon icon={faXmark} style={{ height: "22px", width: "22px" }} />
            </IconButton>
        </div>
    );

    if (!isAuth) {
        return (
            <div className={styles["comments-add-form__notice"]}>
                Войдите или зарегистрируйтесь, чтобы оставлять комментарии.
            </div>
        );
    }

    return (
        <form className={styles["comments-add-form"]}>
            {replyData ? replyBlock : null}
            <div className={styles["comments-add-form__input-field"]}>
                <TextField
                    sx={{ width: "100%" }}
                    label="Комментарий"
                    multiline
                    error={error}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    helperText={error ? "Минимум 10 символов" : ""}
                    minRows={4}
                />
            </div>
            <Button
                variant="contained"
                sx={{
                    display: "block",
                    marginTop: "20px",
                    backgroundColor: "rgb(137, 191, 82)",
                }}
                onClick={() => handleSubmit()}
                disabled={isPending}
            >
                Отправить
            </Button>
        </form>
    );
};

export default AddCommentForm;
