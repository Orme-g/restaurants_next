"use client";
import React, { useState } from "react";

import { Button, TextField } from "@mui/material";
import type { TComment } from "../../models/comment.types";
import type { TDeleteCommentDTO } from "@/entities/comment/models/comment.validators";
import type { UseMutateFunction } from "@tanstack/react-query";
import styles from "./DeleteCommentForm.module.scss";

interface IDeleteCommentFormProps {
    setDisplayForm: (value: boolean) => void; // custom
    commentId: string;
    handleDelete: UseMutateFunction<TComment, Error, TDeleteCommentDTO>;
}
const DeleteCommentForm: React.FC<IDeleteCommentFormProps> = ({
    commentId,
    setDisplayForm,
    handleDelete,
}) => {
    const [inputError, setInputError] = useState<boolean>(false);
    const [deleteReason, setDeleteReason] = useState<string>("");
    const [helperText, setHelperText] = useState<string | null>(null);
    function handleDeleteComment() {
        if (!deleteReason || deleteReason.trim().length < 10) {
            setInputError(true);
            setHelperText("Укажите причину удаления. Минимум 10 символов.");
            return;
        }
        handleDelete({ commentId, reason: deleteReason });
        setHelperText(null);
        setInputError(false);
        setDeleteReason("");
        setDisplayForm(false);
    }
    return (
        <div className={styles["delete-form"]}>
            <div className={styles["delete-form__title"]}>Удаление комментария:</div>
            <div className={styles["delete-form__text-field"]}>
                <TextField
                    label="Причина удаления"
                    size="small"
                    fullWidth
                    value={deleteReason}
                    onChange={(e) => setDeleteReason(e.target.value)}
                    helperText={helperText}
                    error={inputError}
                />
            </div>
            <div className={styles["delete-form__buttons"]}>
                <Button color="error" variant="contained" onClick={handleDeleteComment}>
                    Удалить
                </Button>
                <Button color="success" onClick={() => setDisplayForm(false)}>
                    Отмена
                </Button>
            </div>
        </div>
    );
};
export default DeleteCommentForm;
