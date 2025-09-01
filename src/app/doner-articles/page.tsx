import ArticleLongCard from "@/entities/article/ui/article-long-card/ArticleLongCard";
import { getAllDonerArticles } from "@/entities/article/services/article.service";
import { connectMongoose } from "@/server/db/mongoose";
import transformDate from "@/shared/lib/transfromDate";
import styles from "./page.module.scss";
const DonerArticles = async () => {
    await connectMongoose();
    const articles = await getAllDonerArticles();
    if (!articles) return;

    return (
        <section className={styles["doner-articles-page"]}>
            <div className={styles["doner-articles-page__content"]}>
                <div className={styles["doner-articles-page__title"]}>В поисках той самой...</div>
                <div className={styles["doner-articles-page__about"]}>
                    Мы - движимые мечтой. Мы ищем ту самую, лучшую шаверму. Каждое место посещено
                    нами лично, обзор написан честно и беспристрастно. Несмотря на это - наше мнение
                    всё же субъективно и мы не можем гарантировать, что понравившееся нам - так же
                    понравится и Вам. <br />
                    Но свои поиски мы продолжим, а их результаты читайте ниже.
                </div>
                <div className={styles["doner-articles-page__cards"]}>
                    {articles.map((item, index) => {
                        const { _id, title_image, name, createdAt, rating, short_description } =
                            item;
                        return (
                            <ArticleLongCard
                                articleId={_id}
                                name={name}
                                createdAt={transformDate(createdAt)}
                                rating={rating}
                                description={short_description}
                                title_image={title_image}
                                key={index}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
export default DonerArticles;
