"use client";
import React, { useState } from "react";
import ReviewCard from "./ReviewCard";
import AdditionalReviewForm from "@/features/review/add-extra-review-form/ui/AdditionalReviewForm";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import type { TReviewWithUserdata } from "../../models/review.types";
import styles from "./ReviewCardWithForm.module.scss";

interface IReviewCardWithFormProps {
    data: TReviewWithUserdata;
}
const ReviewCardWithForm: React.FC<IReviewCardWithFormProps> = ({ data }) => {
    const [displayForm, setDispayForm] = useState<boolean>(false);
    function toggleDisplayForm() {
        setDispayForm((displayForm) => !displayForm);
    }
    const addExtraReviewButton = (
        <div className={styles["add-extra-review-button"]}>
            <Button
                style={{ color: "#494949" }}
                endIcon={<FontAwesomeIcon icon={faPen} style={{ fontSize: 16 }} />}
                onClick={toggleDisplayForm}
            >
                Дополнить отзыв
            </Button>
        </div>
    );
    return (
        <div className={styles["review-card-with-form"]}>
            <ReviewCard data={data} addExtraReviewButton={addExtraReviewButton} />
            <AdditionalReviewForm
                restId={data.restaurant.toString()}
                reviewId={data._id}
                displayStatus={displayForm}
                toggleDisplayStatus={toggleDisplayForm}
            />
        </div>
    );
};
export default ReviewCardWithForm;
