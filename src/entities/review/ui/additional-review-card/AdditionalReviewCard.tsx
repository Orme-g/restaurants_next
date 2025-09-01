import React from "react";
import { Rating } from "@mui/material";
import tranfsormDate from "@/shared/lib/transfromDate";
import styles from "./AdditionalReviewCard.module.scss";

interface IAdditionalReviewProps {
    additionalReviewData: {
        like: string;
        dislike: string;
        rating: number;
        added: Date;
    };
}

const AdditionalReviewCard: React.FC<IAdditionalReviewProps> = ({ additionalReviewData }) => {
    const { like, dislike, rating, added } = additionalReviewData;
    const date = tranfsormDate(added);
    return (
        <div className={styles["additional-review"]}>
            <Rating
                sx={{
                    position: "absolute",
                    top: "20px",
                    right: "30px",
                    "@media(max-width:480px)": {
                        fontSize: "16px",
                        top: "15px",
                        right: "15px",
                    },
                }}
                name="rating"
                value={rating}
                precision={0.5}
                readOnly
            />
            <div className={styles["additional-review__content"]}>
                <div className={styles["additional-review__title"]}>Понравилось:</div>
                <div className={styles["additional-review__value"]}>{like}</div>
                <div className={styles["additional-review__title"]}>Не понравилось:</div>
                <div className={styles["additional-review__value"]}>{dislike}</div>
                <div className={styles["additional-review__title"]}>Оценка:</div>
                <div className={styles["additional-review__value"]}>{rating}</div>
                <div className={styles["additional-review__added"]}>Отзыв дополнен: {date}</div>
            </div>
        </div>
    );
};

export default AdditionalReviewCard;
