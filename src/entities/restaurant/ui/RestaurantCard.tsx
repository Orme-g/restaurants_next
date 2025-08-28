import React from "react";
import Link from "next/link";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import styles from "./RestaurantCard.module.scss";

import type { IContentItem } from "../models/restaurant.types";

interface IRestaurantCardProps {
    image: string;
    name: string;
    restId: string;
    content: IContentItem[];
}

const RestaurantCard: React.FC<IRestaurantCardProps> = ({ image, name, restId, content }) => {
    const displayContent = content.map((item, index) => {
        switch (item.type) {
            case "description":
                return (
                    <div key={index} className={styles["restaurant-card__description"]}>
                        {item.value}
                    </div>
                );
            case "cousines":
                return (
                    <div key={index} className={styles["restaurant-card__cousines"]}>
                        {item.value}
                    </div>
                );
            case "bill":
                return (
                    <div key={index} className={styles["restaurant-card__bill"]}>
                        {item.value}₽
                    </div>
                );
            case "rating":
                return (
                    <div key={index} className={styles["restaurant-card__rating"]}>
                        <Rating
                            value={item.value as number}
                            size="small"
                            readOnly
                            precision={0.5}
                        />
                    </div>
                );
        }
    });
    return (
        <Link href={`/restaurant/${restId}`} className={styles["restaurant-card"]}>
            <div className={styles["restaurant-card__image-wrapper"]}>
                <Image
                    src={image}
                    fill
                    sizes="(max-width:768px)100vw,
                    (max-width:1200px)50vw,
                    25vw"
                    alt="restaurant-image"
                    className={styles["restaurant-card__image"]}
                />
            </div>

            <div className={styles["restaurant-card__title"]}>{name}</div>
            <div className={styles["restaurant-card__content"]}>{displayContent}</div>
        </Link>
    );
};

export default RestaurantCard;
