import CarouselImages from "@/shared/ui/carousel/CarouselImages";
import RestaurantInfo from "@/entities/restaurant/ui/restaurant-info/RestaurantInfo";
import { getRestaurantProfile } from "@/entities/restaurant/services/restaurant.service";
import prepareCousineList from "@/entities/restaurant/lib/prepareCousineList";
import Tabs from "@/shared/ui/tabs/Tabs";
import RestaurantDescription from "@/entities/restaurant/ui/restaurant-description/RestaurantDescription";
import ReviewsBlock from "@/widgets/reviews-block/ReviewsBlock";
import YandexMap from "@/shared/ui/yandex-map/YandexMap";
import transformCoordinates from "@/shared/lib/transformCoordinates";
import { connectMongoose } from "@/shared/db/mongoose";
import styles from "./page.module.scss";

import type { TReview } from "@/entities/review/models/review.types";

const Restaurant = async ({ params }: { params: Promise<{ id: string }> }) => {
    await connectMongoose();
    const { id } = await params;
    const restaurant = await getRestaurantProfile(id);
    const reviews: TReview[] = await fetch(`http://localhost:3000/api/reviews/${id}`, {
        next: { revalidate: 600 },
    }).then((response) => response.json());
    if (!restaurant || !reviews) return;
    const {
        averageRating,
        rating,
        cousine,
        adress,
        bill,
        subway,
        phone,
        name,
        images,
        description,
        coordinates,
    } = restaurant;

    return (
        <div className={styles["restaurant-page"]}>
            <div className={styles["restaurant-page__title"]}>{name}</div>
            <div className={styles["restaurant-page__wrapper"]}>
                <div className={styles["restaurant-page__slider"]}>
                    <CarouselImages images={images} />
                </div>
                <div className={styles["restaurant-page__info"]}>
                    <RestaurantInfo
                        restId={id}
                        name={name}
                        averageRating={averageRating}
                        bill={bill}
                        ratingCount={rating.length}
                        cousine={prepareCousineList(cousine)}
                        adress={adress}
                        subway={subway}
                        phone={phone}
                    />
                </div>
            </div>
            <div className={styles["restaurant-page__tabs"]}>
                <Tabs
                    defaultActiveTab="reviews"
                    content={[
                        {
                            label: "О Ресторане",
                            value: "about",
                            component: (
                                <div className={styles["restaurant-page__about-tab"]}>
                                    <RestaurantDescription description={description} />
                                </div>
                            ),
                        },
                        {
                            label: "Меню",
                            value: "menu",
                            component: (
                                <div className={styles["restaurant-page__menu-tab"]}>
                                    <a href="https://ginza.ru/assets/files/20230913/27e44e1ecbae742adbd450c1b16df731.pdf">
                                        Перейти для просмотра меню
                                    </a>
                                </div>
                            ),
                        },
                        {
                            label: "Отзывы",
                            value: "reviews",
                            component: (
                                <div className={styles["restaurant-page__reviews-tab"]}>
                                    <ReviewsBlock restId={id} />
                                </div>
                            ),
                        },
                        {
                            label: "Карта",
                            value: "map",
                            component: (
                                <div className={styles["restaurant-page__map-tab"]}>
                                    <YandexMap
                                        coordinates={transformCoordinates(coordinates)}
                                        zoom={15}
                                        controls={["zoomControl", "fullscreenControl"]}
                                        modules={[
                                            "control.ZoomControl",
                                            "control.FullscreenControl",
                                        ]}
                                    />
                                </div>
                            ),
                        },
                    ]}
                />
            </div>
        </div>
    );
};
export default Restaurant;
