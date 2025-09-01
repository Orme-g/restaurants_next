import React from "react";
import ReviewForm from "@/features/review/add-review/ReviewForm";
import ReviewCard from "@/entities/review/ui/review-card/ReviewCard";
import ToggleAdditionalReview from "@/features/review/toggle-additional-review/ToggleAdditionalReview";
import type { IReview } from "@/entities/review/models/review.types";
import styles from "./ReviewsBlock.module.scss";
interface IReviewsBlockProps {
    reviews: IReview[];
}

const ReviewsBlock: React.FC<IReviewsBlockProps> = ({ reviews }) => {
    return (
        <section className={styles["reviews-block"]}>
            <ReviewForm restId="123123" />
            {reviews.map((item, index) => {
                return item.additionalReview ? (
                    <ToggleAdditionalReview key={index} data={item} />
                ) : (
                    <ReviewCard key={index} data={item} />
                );
            })}
        </section>
    );
};

export default ReviewsBlock;
