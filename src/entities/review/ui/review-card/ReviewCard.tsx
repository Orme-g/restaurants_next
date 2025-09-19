import React from "react";
import Image from "next/image";
import { Rating } from "@mui/material";
import calculateExperience from "@/entities/user/lib/calculateExperience";
import transformDate from "@/shared/lib/transfromDate";
import type { TReviewWithUserdata } from "../../models/review.types";
import styles from "./ReviewCard.module.scss";
interface ReviewItemProps {
    data: TReviewWithUserdata;
    addExtraReviewButton?: React.ReactNode;
}

const ReviewCard: React.FC<ReviewItemProps> = ({ data, addExtraReviewButton }) => {
    const { userId, rating, like, dislike, createdAt } = data;
    const date = transformDate(createdAt);
    const { avatar, username, reviews } = userId;
    return (
        <div className={styles["review-item"]}>
            <div className={styles["review-item__header"]}>
                <div className={styles["review-item__header_avatar"]}>
                    <Image src={avatar} alt={`${username}-avatar`} height={70} width={70} />
                </div>
                <div className={styles["review-item__header_user"]}>
                    <div className={styles["review-item__header_username"]}>{username}</div>
                    <div className={styles["review-item__header_userstatus"]}>
                        {calculateExperience(reviews)}
                    </div>
                </div>
                <div className={styles["review-item__header_middle-space"]}></div>
                <div className={styles["review-item__header_rating-and-date"]}>
                    <div className={styles["review-item__header_rating"]}>
                        <Rating
                            name="rating"
                            value={rating}
                            precision={0.5}
                            readOnly
                            sx={{
                                marginRight: "20px",
                                "@media (max-width: 480px)": {
                                    fontSize: "14px",
                                },
                            }}
                        />
                    </div>
                    <div className={styles["review-item__header_date"]}>{date} </div>
                </div>
            </div>
            <div className={styles["review-item__body"]}>
                <div className={styles["review-item__body_title"]}>Понравилось:</div>
                <div className={styles["review-item__body_content"]}>{like}</div>
                <div className={styles["review-item__body_title"]}>Не понравилось:</div>
                <div className={styles["review-item__body_content"]}>{dislike}</div>
                <div className={styles["review-item__body_title"]}>Оценка:</div>
                <div className={styles["review-item__body_content"]}>{rating}</div>
                {addExtraReviewButton}
            </div>
        </div>
    );
};

export default ReviewCard;
