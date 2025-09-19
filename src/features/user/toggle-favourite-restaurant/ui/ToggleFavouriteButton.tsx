"use client";
import React from "react";
import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartFilled } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { useCheckIfFavourite } from "../api/useCheckIfFavourite";
import { useHandleFavouriteRestaurant } from "../api/useHandleFavouriteRestaurant";
import { useAuthStore } from "@/shared/store/auth.store";
import Spinner from "@/shared/ui/spinner/Spinner";
import styles from "./ToggleFavouriteButton.module.scss";

interface IFavouriteButtonProps {
    restId: string;
    restName: string;
}

const FavouriteButton: React.FC<IFavouriteButtonProps> = ({ restId, restName }) => {
    console.log(restId, restName);
    const ifAuth = useAuthStore((state) => state.isAuth);
    const { data: isFavourite, isLoading } = useCheckIfFavourite(restId, {
        enabled: Boolean(ifAuth),
    });
    const { mutate: handleFavourite, isPending } = useHandleFavouriteRestaurant();
    function handleToggle() {
        if (isFavourite) {
            handleFavourite({ restId, restName, favourite: false });
        } else {
            handleFavourite({ restId, restName, favourite: true });
        }
    }
    if (!ifAuth) {
        return;
    }
    if (isLoading) {
        return (
            <div className={styles["favourite__spinner"]}>
                <Spinner />
            </div>
        );
    }
    return (
        <IconButton
            disabled={isPending}
            className={styles["favourite__button"]}
            onClick={handleToggle}
        >
            <FontAwesomeIcon
                icon={isFavourite ? faHeartFilled : faHeartOutline}
                className={styles["favourite__icon"]}
            />
        </IconButton>
    );
};
export default FavouriteButton;
