import React from "react";
import Image from "next/image";
import { Rating } from "@mui/material";

// import EditIcon from "@mui/icons-material/Edit";
// import { useGetUserPublicDataQuery } from "../../services/userApi";
// import { calculateExperience } from "../../utils/calculateExperience";
// import { ReviewItemSkeleton } from "../skeletons/Skeletons";
// import tranfsormDate from "../../utils/transformDate";
// import AdditionalReviewItem from "../additionalReviewItem/AdditionalReviewItem";
// import AdditionalReviewForm from "../forms/additionalReviewForm/AdditionalReviewForm";
// import { useAppSelector } from "../../types/store";
// import type { IReview } from "../../types/restaurantsTypes";
import calculateExperience from "@/entities/user/lib/calculateExperience";
import transformDate from "@/shared/lib/transfromDate";
import type { IReview } from "../../models/review.types";

import styles from "./ReviewCard.module.scss";

interface ReviewItemProps {
    data: IReview;
}

const ReviewCard: React.FC<ReviewItemProps> = ({ data }) => {
    // const [displayAdditionForm, setDisplayAdditionForm] = useState<boolean>(false);
    const {
        userId,
        rating,
        like,
        dislike,
        createdAt,
        additionalReview,
        _id: reviewId,
        restaurant,
    } = data;
    const date = transformDate(createdAt);
    return (
        <div className={styles["review-item"]}>
            <div className={styles["review-item__header"]}>
                <div className={styles["review-item__header_avatar"]}>
                    {/* <Image src={"avatar"} alt={`${"name"}-avatar`} height={70} width={70} /> */}
                </div>
                <div className={styles["review-item__header_user"]}>
                    <div className={styles["review-item__header_username"]}>Name</div>
                    <div className={styles["review-item__header_userstatus"]}>
                        {/* {calculateExperience(reviews)} */}
                        Newbie
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
                    {/* <div className="review-item__header_date">{date} </div> */}
                    <div className={styles["review-item__header_date"]}>12.08.2024</div>
                </div>
            </div>
            <div className={styles["review-item__body"]}>
                <div className={styles["review-item__body_title"]}>Понравилось:</div>
                <div className={styles["review-item__body_content"]}>{like}</div>
                <div className={styles["review-item__body_title"]}>Не понравилось:</div>
                <div className={styles["review-item__body_content"]}>{dislike}</div>
                <div className={styles["review-item__body_title"]}>Оценка:</div>
                <div className={styles["review-item__body_content"]}>{rating}</div>
            </div>
        </div>
    );
};

export default ReviewCard;
