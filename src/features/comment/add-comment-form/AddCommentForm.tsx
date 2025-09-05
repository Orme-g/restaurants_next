"use client";
import React from "react";
import { useState } from "react";

// import { useAppDispatch, useAppSelector } from "../../../types/store";
// import { callSnackbar } from "../../../reducers/interactive";
import { TextField, Button, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
// import CloseIcon from "@mui/icons-material/Close";
// import { usePostCommentMutation } from "../../../services/commentsApi";

// import type { IReplyData, TCommentReplyFunction, INewComment } from "../../../types/commentsTypes";
import styles from "./AddCommentForm.module.scss";
interface ICommentFormProps {
    // replyData: IReplyData;
    topicId: string;
    // setReplyData: TCommentReplyFunction;
}
const AddCommentForm: React.FC<ICommentFormProps> = ({ topicId }) => {
    // const AddCommentForm: React.FC<ICommentFormProps> = ({ replyData, topicId, setReplyData }) => {
    const [commentText, setCommentText] = useState("");
    const [valid, setValid] = useState(false);
    // const [postComment] = usePostCommentMutation();
    // const dispatch = useAppDispatch();
    // const userData = useAppSelector((state) => state.interactive.userData);
    function handleSubmit() {
        if (commentText.length < 10) {
            setValid(true);
            return;
        }
        // if (!userData) {
        //     return;
        // }
        setValid(false);
        // let newComment: INewComment = {
        //     name: userData.username,
        //     topic: topicId,
        //     likes: 0,
        //     dislikes: 0,
        //     text: commentText,
        // };
        // if (replyData?.commentId) {
        //     newComment = { ...newComment, replyToComment: replyData.commentId };
        // }
        // postComment(newComment)
        //     .unwrap()
        //     .then(({ message }) => {
        //         dispatch(callSnackbar({ type: "success", text: message }));
        //         setCommentText("");
        //         setReplyData({ name: null, text: null, commentId: null });
        //     })
        //     .catch((error) => dispatch(callSnackbar({ type: "error", text: error.data })));

        // setReplyData({ name: null, text: null, commentId: null });
    }
    const replyBlock = (
        <div className={styles["comments-add-form__reply"]}>
            Ответ на:
            {/* <div className="comments-add-form__reply_name">{replyData?.name}</div>
            <div className="comments-add-form__reply_text">{replyData?.text}</div> */}
            <div className={styles["comments-add-form__reply_name"]}>Lol</div>
            <div className={styles["comments-add-form__reply_text"]}>Chto</div>
            <IconButton
                sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                }}
                // onClick={() => setReplyData({ name: null, text: null, commentId: null })}
            >
                <FontAwesomeIcon icon={faXmark} />
                {/* <CloseIcon /> */}
            </IconButton>
        </div>
    );

    return (
        <form className={styles["comments-add-form"]}>
            {/* {replyData.name ? replyBlock : null} */}
            <div className={styles["comments-add-form__input-field"]}>
                <TextField
                    sx={{ width: "100%" }}
                    label="Комментарий"
                    multiline
                    error={valid}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    helperText={valid ? "Минимум 10 символов" : ""}
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
            >
                Отправить
            </Button>
        </form>
    );
};

export default AddCommentForm;
