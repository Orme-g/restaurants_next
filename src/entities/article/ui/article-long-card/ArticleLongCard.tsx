import React from "react";
import Link from "next/link";
import { Rating } from "@mui/material";
import LongCard from "@/shared/ui/long-card/LongCard";
import styles from "./ArticleLongCard.module.scss";

interface IArticleLongCardProps {
    articleId: string;
    title_image: string;
    name: string;
    createdAt: string;
    rating: number;
    description: string;
}

const ArticleLongCard: React.FC<IArticleLongCardProps> = ({
    articleId,
    title_image,
    name,
    createdAt,
    rating,
    description,
}) => {
    const articleHeader = (
        <div className={styles["header-wrapper"]}>
            <div className={styles["article-card__name"]}>{name}</div>{" "}
            <div className={styles["article-card__created-date"]}>{createdAt}</div>
        </div>
    );
    const articleContent = <div className={styles["article-card__description"]}>{description}</div>;
    const articleFooter = (
        <div className={styles["article-card__rating"]}>
            <Rating value={rating} precision={0.5} readOnly />
        </div>
    );
    return (
        <Link href={`/doner-articles/${articleId}`} className={styles["article-card"]}>
            <LongCard
                image={title_image}
                header={articleHeader}
                content={articleContent}
                footer={articleFooter}
            />
        </Link>
    );
};
export default ArticleLongCard;
