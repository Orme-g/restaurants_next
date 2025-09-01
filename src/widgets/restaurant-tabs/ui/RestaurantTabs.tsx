"use client";
import React, { useState } from "react";
import { Tab, Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import RestaurantDescription from "@/entities/restaurant/ui/restaurant-description/RestaurantDescription";
import ReviewsBlock from "@/widgets/reviews-block/ReviewsBlock";

import styles from "./RestaurantTabs.module.scss";
import type { IReview } from "@/entities/review/models/review.types";

interface IRestaurantTabsProps {
    reviews: IReview[];
}

const RestaurantTabs: React.FC<IRestaurantTabsProps> = ({ reviews }) => {
    const [activeTab, setActiveTab] = useState("3");
    const handleChange = (event: React.SyntheticEvent, newActiveTab: string) => {
        setActiveTab(newActiveTab);
    };

    return (
        <div className={styles["restaurants-tabs__container"]}>
            <Box sx={{ width: "100%" }}>
                <TabContext value={activeTab}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                            onChange={handleChange}
                            aria-label="Restaurant Tabs"
                            variant="scrollable"
                        >
                            <Tab label="О Ресторане" value="1" />
                            <Tab label="Меню" value="2" />
                            <Tab label="Отзывы" value="3" />
                            <Tab label="События" value="4" />
                            <Tab label="Карта" value="5" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ p: 0 }}>
                        <RestaurantDescription description="lololo" />
                    </TabPanel>
                    <TabPanel value="2">
                        <div className={styles["restaurants-tabs__menu"]}>
                            <a href="https://ginza.ru/assets/files/20230913/27e44e1ecbae742adbd450c1b16df731.pdf">
                                Перейти для просмотра меню
                            </a>
                        </div>
                    </TabPanel>
                    <TabPanel value="3">
                        <div className={styles["restaurants-tabs__reviews"]}>
                            <ReviewsBlock reviews={reviews} />
                        </div>
                    </TabPanel>
                    {/* <TabPanel value="4">
                        <div className="restaurants-tabs__events">
                            <EventsList />
                        </div>
                    </TabPanel> */}
                    {/* <TabPanel value="5">
                        <div id="map" className="restaurants-tabs__map">
                            <YMaps>
                                <Map
                                    width={"100%"}
                                    height={"100%"}
                                    defaultState={{
                                        center: coordinatesToUse,

                                        zoom: 15,
                                        controls: ["zoomControl", "fullscreenControl"],
                                    }}
                                    modules={["control.ZoomControl", "control.FullscreenControl"]}
                                >
                                    <Placemark geometry={coordinatesToUse} />
                                </Map>
                            </YMaps>
                        </div>
                    </TabPanel> */}
                </TabContext>
            </Box>
        </div>
    );
};
export default RestaurantTabs;
