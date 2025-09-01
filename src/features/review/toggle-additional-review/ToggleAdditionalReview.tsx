"use client";
import React, { useState } from "react";
import clsx from "clsx";
import ReviewCard from "@/entities/review/ui/review-card/ReviewCard";
import AdditionalReviewCard from "@/entities/review/ui/additional-review-card/AdditionalReviewCard";
import styles from "./ToggleAdditionalReview.module.scss";
import type { IReview } from "@/entities/review/models/review.types";

interface IToggleExtraReviewProps {
    data: IReview;
}
const ToggleAdditionalReview: React.FC<IToggleExtraReviewProps> = ({ data }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const interactiveText = isVisible ? "Скрыть отзыв" : "Отзыв дополнен";
    function toggleDisplExtrtaReview() {
        setIsVisible((isVisible) => !isVisible);
    }
    const { additionalReview } = data;
    if (!data || !additionalReview) {
        return;
    }

    return (
        <div className={styles["card-with-additional-review"]}>
            <ReviewCard data={data} />
            <div className={styles["toggle-display-extra-review"]}>
                <button
                    className={styles["toggle-display-extra-review__button"]}
                    onClick={toggleDisplExtrtaReview}
                >
                    {interactiveText}
                </button>
            </div>
            <div
                className={clsx(
                    styles["animated-block"],
                    isVisible ? styles["show-with-animation"] : styles["hide-with-animation"]
                )}
            >
                <AdditionalReviewCard additionalReviewData={additionalReview} />
            </div>
        </div>
    );
};
export default ToggleAdditionalReview;
