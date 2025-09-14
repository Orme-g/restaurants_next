import React from "react";
import ReviewForm from "@/features/review/add-review-form/ReviewForm";
import ReviewCard from "@/entities/review/ui/review-card/ReviewCard";
import ReviewCardWithAddition from "@/entities/review/ui/review-card/ReviewCardWithAddition";
import ReviewCardWithForm from "@/entities/review/ui/review-card/ReviewCardWithForm";
import type { TReview } from "@/entities/review/models/review.types";
import styles from "./ReviewsBlock.module.scss";
interface IReviewsBlockProps {
    restId: string;
}

const ReviewsBlock: React.FC<IReviewsBlockProps> = async ({ restId }) => {
    const reviews: TReview[] = await fetch(`http://localhost:3000/api/reviews/${restId}`, {
        next: { revalidate: 600 },
    }).then((response) => response.json());
    if (!reviews) return;
    return (
        <section className={styles["reviews-block"]}>
            <ReviewForm restId="123123" />
            {reviews.map((item, index) => {
                return item.additionalReview ? (
                    <ReviewCardWithAddition key={index} data={item} />
                ) : (
                    <ReviewCardWithForm key={index} data={item} />
                );
            })}
        </section>
    );
};

export default ReviewsBlock;
