"use client";
import React from "react";
import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartFilled } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import styles from "./ToggleFavouriteButton.module.scss";

interface IFavouriteButtonProps {
    isFavourite: boolean;
    restId: string;
}
const FavouriteButton: React.FC<IFavouriteButtonProps> = ({ isFavourite, restId }) => {
    return (
        <IconButton className={styles["favourite__button"]}>
            <FontAwesomeIcon
                icon={isFavourite ? faHeartFilled : faHeartOutline}
                className={styles["favourite__icon"]}
            />
        </IconButton>
    );
};
export default FavouriteButton;
