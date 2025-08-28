import React from "react";
import CarouselCards from "@/shared/ui/carousel/CarouselCards";
import RestaurantCard from "@/entities/restaurant/ui/RestaurantCard";
import { getRestaurantsBySortCriteria } from "@/entities/restaurant/services/restaurants.service";
import { connectMongoose } from "@/server/db/mongoose";
import prepareCousineList from "@/entities/restaurant/lib/prepareCousineList";
import styles from "./RestaurantSelection.module.scss";
import type {
    TRestaurantSortCriteria,
    IContentItem,
} from "@/entities/restaurant/models/restaurant.types";

interface IRestaurantSelection {
    title: string;
    sortCriteria: TRestaurantSortCriteria;
}

const RestaurantSelection: React.FC<IRestaurantSelection> = async ({ title, sortCriteria }) => {
    await connectMongoose();
    const restaurants = await getRestaurantsBySortCriteria(sortCriteria, 6);
    const cards = restaurants.map((item) => {
        const { name, _id, title_image, cousine, bill, averageRating } = item;
        const cousineString = prepareCousineList(cousine);
        const content: IContentItem[] = [
            { type: "bill", value: bill },
            { type: "cousines", value: cousineString },
            { type: "rating", value: averageRating },
        ];
        return (
            <RestaurantCard
                key={_id}
                image={title_image}
                restId={_id!}
                name={name}
                content={content}
            />
        );
    });
    return (
        <article>
            <div className={styles["selection__title"]}>{title}</div>
            <CarouselCards cards={cards} />
        </article>
    );
};
export default RestaurantSelection;
