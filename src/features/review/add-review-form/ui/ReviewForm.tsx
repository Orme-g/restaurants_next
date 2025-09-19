"use client";
import React, { useState } from "react";
import clsx from "clsx";

import { useForm } from "react-hook-form";
import { Button, Stack, TextField, Rating } from "@mui/material";
import { useAuthStore } from "@/shared/store/auth.store";
import { useCheckReviewed } from "../api/useCheckReviewed";
import { usePostReview } from "../api/usePostReview";
import TextLineSkeleton from "@/shared/ui/skeletons/TextLineSkeleton";
import type { TNewReviewDTO } from "@/entities/review/models/review.validators";

import styles from "./ReviewForm.module.scss";

interface IReviewForm {
    restId: string;
}
const ReviewForm: React.FC<IReviewForm> = ({ restId }) => {
    const [rating, setRating] = useState<number>(1);
    const [displayForm, setDisplayForm] = useState(false);
    const { userData, isAuth } = useAuthStore();
    const { mutateAsync: postReview } = usePostReview();
    const { data: isReviewed, isLoading } = useCheckReviewed(restId, { enabled: Boolean(isAuth) });
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            like: "",
            dislike: "",
        },
    });
    const onSubmit = (data: { like: string; dislike: string }) => {
        const { like, dislike } = data;
        const review: TNewReviewDTO = {
            like,
            dislike,
            rating,
            restId,
        };
        postReview(review).then(() => {
            reset();
            setRating(1);
        });
    };

    const toggleDisplay = () => {
        setDisplayForm((display) => !display);
    };

    if (isLoading || isAuth === null) {
        return (
            <div className={styles["add-review__skeleton"]}>
                <TextLineSkeleton />
            </div>
        );
    }
    if (isReviewed) {
        return <div className={styles["add-review__notice"]}>Вы уже оставили отзыв</div>;
    }
    if (!userData || !isAuth) {
        return <div className={styles["add-review__notice"]}>Войдите, чтобы оставить отзыв</div>;
    }
    const { name } = userData;

    return (
        <>
            <Button
                sx={{
                    width: "200px",
                    color: "#494949",
                    fontSize: "1.1rem",
                }}
                onClick={() => toggleDisplay()}
            >
                Написать отзыв
            </Button>

            <div
                className={clsx(
                    styles["add-review__container"],
                    displayForm ? styles["show"] : styles["hide"]
                )}
            >
                <div className={styles["add-review__header"]}>
                    <div className={styles["add-review__header_username"]}>{name}</div>
                </div>
                <form className={styles["add-review__form"]} onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3} width={450} mb={2}>
                        <TextField
                            label="Что понравилось"
                            {...register("like", {
                                required: "Минимум 10 символов",
                                minLength: 10,
                            })}
                            error={!!errors.like}
                            helperText={errors.like?.message}
                            multiline
                            minRows={3}
                        />
                        <TextField
                            label="Что не понравилось"
                            {...register("dislike", {
                                required: "Минимум 10 символов",
                                minLength: 10,
                            })}
                            error={!!errors.dislike}
                            helperText={errors.dislike?.message}
                            multiline
                            minRows={3}
                        />
                        <Stack direction={"row"}>
                            <Rating
                                size="large"
                                value={rating}
                                precision={0.5}
                                onChange={(_, newValue) => {
                                    setRating(newValue as number);
                                }}
                            />
                            <Button type="submit" sx={{ marginLeft: "auto" }}>
                                Отправить
                            </Button>
                            <Button onClick={() => toggleDisplay()}>Отмена</Button>
                        </Stack>
                    </Stack>
                </form>
            </div>
        </>
    );
};

export default ReviewForm;
