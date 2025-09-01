import React from "react";
import styles from "./LongCard.module.scss";

interface ILongCardProps {
    image: string;
    header: React.ReactNode;
    content: React.ReactNode;
    footer?: React.ReactNode;
}

const LongCard: React.FC<ILongCardProps> = ({ image, header, content, footer }) => {
    return (
        <div className={styles["long-card"]}>
            <div className={styles["long-card__picture"]}>
                <img src={image} alt="card-image" />
            </div>
            <div className={styles["long-card__container"]}>
                <div className={styles["long-card__header"]}>{header}</div>
                <div className={styles["long-card__content"]}>{content}</div>
                {footer ? <div className={styles["long-card__footer"]}>{footer}</div> : null}
            </div>
        </div>
    );
};

export default LongCard;
