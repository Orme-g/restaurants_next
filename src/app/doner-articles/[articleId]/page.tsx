import React from "react";
import { Rating } from "@mui/material";
import { getArticleById } from "@/entities/article/services/article.service";
import CarouselImages from "@/shared/ui/carousel/CarouselImages";
import { connectMongoose } from "@/server/db/mongoose";
import transformDate from "@/shared/lib/transfromDate";
import styles from "./page.module.scss";

interface IArticlePageProps {
    params: Promise<{ articleId: string }>;
}

const ArticlePage: React.FC<IArticlePageProps> = async ({ params }) => {
    await connectMongoose();
    const { articleId } = await params;
    const articleData = await getArticleById(articleId);
    if (!articleData) return;
    const { name, subtitle, title_image, rating, author, createdAt, content } = articleData;
    // Reafctor >>---->
    const readyToDisplay = content.map((item, index) => {
        if ("text" in item) {
            return <p key={index}>{item.text}</p>;
        } else if ("bloquote" in item) {
            return <blockquote key={index}>{item.bloquote}</blockquote>;
        } else if ("photo" in item) {
            return (
                <div key={index} className="content__image">
                    <img src={item.photo as string} alt="post_image" />
                </div>
            );
        } else if ("slider" in item) {
            return (
                <div key={index} className={styles["content__slider"]}>
                    <CarouselImages images={item.slider as string[]} />
                </div>
            );
        } else {
            return null;
        }
    }); // <----<<

    return (
        <section className={styles["article-page"]}>
            <div className={styles["article__container"]}>
                <div className={styles["article__title"]}>
                    {name}
                    <div className={styles["article__subtitle"]}> {subtitle} </div>
                </div>
                <div className={styles["article__image"]}>
                    <img src={title_image} alt="doner" />
                </div>
                <div className={styles["article__content"]}>{readyToDisplay}</div>
                <div className={styles["article__rating"]}>
                    Наша оценка:{" "}
                    <Rating
                        value={rating}
                        readOnly
                        precision={0.1}
                        sx={{
                            marginLeft: "15px",
                            transform: "translateY(5px)",
                        }}
                        size="large"
                    />
                </div>
                <div className={styles["article__author"]}>
                    Автор статьи: <span>{author}</span>
                </div>
                <div className={styles["article__published"]}>
                    Опубликовано: <span>{transformDate(createdAt)}</span>
                </div>
            </div>
            <div className={styles["article__comments"]}>Пока нет блока комментариев....</div>
        </section>
    );
};
export default ArticlePage;
