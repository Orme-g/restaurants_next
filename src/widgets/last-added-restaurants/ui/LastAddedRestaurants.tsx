import styles from "./LastAddedRestaurants.module.scss";
import RestaurantCard from "@/entities/restaurant/ui/RestaurantCard";
import { connectMongoose } from "@/server/db/mongoose";
import { getNewlyAddedRestaurants } from "@/entities/restaurant/services/restaurants.service";
import type { IContentItem } from "@/entities/restaurant/models/restaurant.types";

const LastAddedRestaurants = async () => {
    await connectMongoose();
    const lastAddedRestaurants = await getNewlyAddedRestaurants(6);

    const restaurantCards = lastAddedRestaurants.map((restaurantData) => {
        const { _id, title_image, name, short_description } = restaurantData;
        const content: IContentItem[] = [
            {
                type: "description",
                value: short_description,
            },
        ];
        return (
            <RestaurantCard
                key={_id}
                restId={_id!}
                name={name}
                image={title_image}
                content={content}
            />
        );
    });
    return (
        <>
            <section className={styles["last-added-restaurants"]}>
                <div className={styles["last-added-restaurants__title"]}>
                    Последние добавленные рестораны
                </div>
                <div className={styles["last-added-restaurants__cards-list"]}>
                    {restaurantCards}
                </div>
            </section>
        </>
    );
};

export default LastAddedRestaurants;
