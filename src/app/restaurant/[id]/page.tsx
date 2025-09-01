import CarouselImages from "@/shared/ui/carousel/CarouselImages";
import RestaurantInfo from "@/entities/restaurant/ui/restaurant-info/RestaurantInfo";
import { getRestaurantProfile } from "@/entities/restaurant/services/restaurant.service";
import prepareCousineList from "@/entities/restaurant/lib/prepareCousineList";
import RestaurantTabs from "@/widgets/restaurant-tabs/ui/RestaurantTabs";
import { connectMongoose } from "@/server/db/mongoose";
import styles from "./page.module.scss";

import type { IReview } from "@/entities/review/models/review.types";

const Restaurant = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    await connectMongoose();
    const restaurant = await getRestaurantProfile(id);
    const reviews: IReview[] = await fetch(`http://localhost:3000/api/reviews/${id}`, {
        next: { revalidate: 600 },
    }).then((response) => response.json());
    if (!restaurant || !reviews) return;
    const { averageRating, rating, cousine, adress, bill, subway, phone, name, images } =
        restaurant;

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
            <RestaurantTabs reviews={reviews} />
        </div>
    );
};
export default Restaurant;
