import CarouselImages from "@/shared/ui/carousel/CarouselImages";
import RestaurantInfo from "@/entities/restaurant/ui/RestaurantInfo";
import { getRestaurantProfile } from "@/entities/restaurant/services/restaurants.service";
import prepareCousineList from "@/entities/restaurant/lib/prepareCousineList";
import styles from "./page.module.scss";

const Restaurant = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const restaurant = await getRestaurantProfile(id);
    if (!restaurant) return;
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
        </div>
    );
};
export default Restaurant;
