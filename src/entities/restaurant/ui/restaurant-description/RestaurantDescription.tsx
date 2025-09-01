import React from "react";
import styles from "./RestaurantDescription.module.scss";
interface IRestaurantDescriptionProps {
    description: string;
}
const RestaurantDescription: React.FC<IRestaurantDescriptionProps> = ({ description }) => {
    return <div className={styles["restaurant-description"]}>{description}</div>;
};
export default RestaurantDescription;
