import React, { useState } from "react";
import { Stack, TextField, Button, Rating } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import clsx from "clsx";

// import { useAddAdditionalReviewMutation } from "../../../services/restaurantsApi";
// import { useAppDispatch } from "../../../types/store";
// import { callSnackbar } from "../../../reducers/interactive";
import styles from "./AdditionalReviewForm.module.scss";

// import type { IAddidionalReview } from "../../../types/restaurantsTypes";
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
    // const onSubmit: SubmitHandler<SubmitCredentials> = (data: {
    //     like: string;
    //     dislike: string;
    // }) => {
    //     const { like, dislike } = data;
    //     const additionalReview: IAddidionalReview = {
    //         reviewId,
    //         like,
    //         dislike,
    //         rating,
    //         restId,
    //     };
    //     sendAdditionalReview(additionalReview)
    //         .unwrap()
    //         .then(({ message }) => {
    //             dispatch(callSnackbar({ text: message, type: "success" }));
    //             reset();
    //         })
    //         .catch((error) => dispatch(callSnackbar({ text: error.data, type: "error" })));
    // };
    // const currentFormStatus = displayStatus ? "show-with-animation" : "hide-with-animation";

    return (
        <form
            // className={clsx({styles[additional-review-form]}, ${currentFormStatus})}
            className={clsx(
                styles["additional-review-form"],
                displayStatus ? styles["show-with-animation"] : styles["hide-with-animation"]
            )}
            // onSubmit={handleSubmit(onSubmit)}
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
                {/* <Stack direction="row"> */}
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

                {/* </Stack> */}
            </Stack>
        </form>
    );
};
export default AdditionalReviewForm;
