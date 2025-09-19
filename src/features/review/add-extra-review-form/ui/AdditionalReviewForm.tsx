import React, { useState } from "react";
import { Stack, TextField, Button, Rating } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import clsx from "clsx";
import { usePostAdditionalReview } from "../api/usePostAdditionalReview";
import type { TAdditionalReviewDTO } from "@/entities/review/models/review.validators";
import styles from "./AdditionalReviewForm.module.scss";
interface TAdditionalReviewFormProps {
    reviewId: string;
    restId: string;
    displayStatus: boolean;
    toggleDisplayStatus: () => void;
}
interface SubmitCredentials {
    like: string;
    dislike: string;
}

const AdditionalReviewForm: React.FC<TAdditionalReviewFormProps> = ({
    reviewId,
    restId,
    displayStatus,
    toggleDisplayStatus,
}) => {
    const [rating, setRating] = useState<number>(1);
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
    const { mutateAsync: postAdditionalReview } = usePostAdditionalReview();
    const onSubmit: SubmitHandler<SubmitCredentials> = (data: {
        like: string;
        dislike: string;
    }) => {
        const { like, dislike } = data;
        const additionalReview: TAdditionalReviewDTO = {
            reviewId,
            like,
            dislike,
            rating,
            restId,
        };
        postAdditionalReview(additionalReview).then(() => reset());
    };

    return (
        <form
            className={clsx(
                styles["additional-review-form"],
                displayStatus ? styles["show-with-animation"] : styles["hide-with-animation"]
            )}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Stack spacing={3} sx={{ margin: "20px" }}>
                <div>Дополните ваш отзыв:</div>
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
                <div className={styles["additional-review-form__actions"]}>
                    <Rating
                        size="large"
                        precision={0.5}
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue as number);
                        }}
                    />
                    <div className={styles["additional-review-form__buttons"]}>
                        <Button type="submit">Отправить</Button>

                        <Button onClick={toggleDisplayStatus}>Отмена</Button>
                    </div>
                </div>
            </Stack>
        </form>
    );
};
export default AdditionalReviewForm;
