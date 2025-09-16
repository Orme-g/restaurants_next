import React from "react";
import RestaurantSearchBar from "@/features/restaurant/restaurant-serach/ui/RestaurantSearchBar";
import LastAddedRestaurants from "@/widgets/last-added-restaurants/ui/LastAddedRestaurants";
import RestaurantSelection from "@/widgets/restaurant-selection/ui/RestaurantSelection";

import styles from "./page.module.scss";

export default async function Home() {
    return (
        <>
            <section className={styles["hero"]}>
                <div className={styles["hero__search-bar"]}>
                    <RestaurantSearchBar />
                </div>
            </section>
            <section className={styles["last-added-restaurants"]}>
                <LastAddedRestaurants />
            </section>
            <section className={styles["restaurant-selections"]}>
                <div className={styles["restaurant-selections__title"]}>Наши подборки для вас</div>
                <RestaurantSelection title={"Самые доступные рестораны"} sortCriteria={"cheap"} />
                <RestaurantSelection title={"Самые дорогие рестораны"} sortCriteria={"expensive"} />
                <RestaurantSelection title={"Самый высокий рейтинг"} sortCriteria={"best"} />
            </section>
        </>
    );
}
