import React from "react";
import ReviewForm from "@/features/review/add-review-form/ui/ReviewForm";
import ReviewCardWrapper from "@/entities/review/ui/review-card/ReviewCardWrapper";
import type { TReviewWithUserdata } from "@/entities/review/models/review.types";
import styles from "./ReviewsBlock.module.scss";
interface IReviewsBlockProps {
    restId: string;
}

const ReviewsBlock: React.FC<IReviewsBlockProps> = async ({ restId }) => {
    const reviews: TReviewWithUserdata[] = await fetch(
        `http://localhost:3000/api/reviews/${restId}`,
        {
            next: { tags: [`reviews-${restId}`] },
        }
    ).then((response) => response.json());
    if (!reviews) return;
    return (
        <section className={styles["reviews-block"]}>
            <ReviewForm restId={restId} />
            {reviews.map((item, index) => {
                return <ReviewCardWrapper data={item} key={index} />;
            })}
        </section>
    );
};

export default ReviewsBlock;
