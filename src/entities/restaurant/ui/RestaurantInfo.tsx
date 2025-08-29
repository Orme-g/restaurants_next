import React from "react";

import { Rating } from "@mui/material";
import FavouriteButton from "@/features/toggle-favourite/ToggleFavouriteButton";
import styles from "./RestaurantInfo.module.scss";

interface IRestaurantInfoProps {
    restId: string;
    averageRating: number;
    ratingCount: number;
    cousine: string;
    adress: string;
    subway: string[];
    bill: number;
    phone: string;
}
const RestaurantInfo: React.FC<IRestaurantInfoProps> = ({
    restId,
    averageRating,
    ratingCount,
    cousine,
    adress,
    subway,
    bill,
    phone,
}) => {
    return (
        <div className={styles["restaurant-info"]}>
            <FavouriteButton isFavourite={true} restId={restId} />
            <div className={styles["restaurant-info__rating"]}>
                Рейтинг: <br />
                <div className={styles["restaurant-info__rating_stars-and-marks"]}>
                    <div>
                        <Rating
                            name="read-only"
                            value={averageRating}
                            precision={0.1}
                            readOnly
                            size="large"
                        />
                    </div>

                    <div className={styles["restaurant-info__rating_marks-amount"]}>
                        ({ratingCount})
                    </div>
                </div>
            </div>
            <div className={styles["restaurant-info__items-wrapper"]}>
                <div className={styles["restaurant-info__item"]}>
                    Кухня: <span>{cousine}</span>
                </div>
                <div className={styles["restaurant-info__item"]}>
                    Время работы: <br />
                    <span>ПН-ЧТ: 10:00 - 22:00</span>
                    <br />
                    <span>ПТ-ВС: 10:00 - 00:00</span>
                </div>
                <div className={styles["restaurant-info__item"]}>
                    Адрес: <span>{adress}</span>
                </div>
                <div className={styles["restaurant-info__item"]}>
                    Метро:
                    {subway.map((station) => (
                        <span className="subway" key={station}>
                            {station}
                        </span>
                    ))}
                </div>
                <div className={styles["restaurant-info__item"]}>
                    Средний чек: <span>{bill} &#8381;</span>
                </div>
                <div className={styles["restaurant-info__item"]}>
                    Телефон: <span>{phone}</span>
                </div>
            </div>
        </div>
    );
};
export default RestaurantInfo;
