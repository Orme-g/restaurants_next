export type TRestaurantSortCriteria = "expensive" | "cheap" | "best";

import type { TRestaurantSchema } from "./restaurant.schema";
export type TRestaurant = TRestaurantSchema & { _id: string };
export interface IContentItem {
    type: "rating" | "description" | "bill" | "cousines";
    value: number | string;
}

export interface IRestaurantSearchResult {
    name: string;
    _id: string;
}
