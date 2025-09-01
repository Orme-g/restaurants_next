import React from "react";
import Link from "next/link";
import { Rating } from "@mui/material";
import LongCard from "@/shared/ui/long-card/LongCard";

import styles from "./RestaurantLongCard.module.scss";

interface IRestaurantLongCardProps {
    name: string;
    title_image: string;
    description: string;
    cousine: string;
    bill: number;
    averageRating: number;
}

const RestaurantLongCard: React.FC<IRestaurantLongCardProps> = ({
    name,
    title_image,
    description,
    cousine,
    bill,
    averageRating,
}) => {
    const cardHeader = <div className={styles["restaurant-card__name"]}>{name}</div>;
    const cardContent = (
        <div className={styles["restaurant-card__content"]}>
            <div className={styles["restaurant-card__description"]}>{description}</div>
            <div className={styles["restaurant-card__composite-item"]}>
                <div className={styles["restaurant-card__title"]}>Кухня:</div>
                <div className={styles["restaurant-card__value"]}>{cousine}</div>
            </div>
            <div className={styles["restaurant-card__composite-item"]}>
                <div className={styles["restaurant-card__title"]}>Средний чек:</div>
                <div className={styles["restaurant-card__value"]}>{bill}&#8381;</div>
            </div>
            <div className={styles["restaurant-card__composite-item"]}>
                <div className={styles["restaurant-card__title"]}>Рейтинг:</div>
                <div className={styles["restaurant-card__value"]}>
                    <Rating value={averageRating} precision={0.5} readOnly />
                </div>
            </div>
        </div>
    );

    return (
        <Link href={"/rest"}>
            <LongCard header={cardHeader} content={cardContent} image={title_image} />
        </Link>
    );
};
export default RestaurantLongCard;
