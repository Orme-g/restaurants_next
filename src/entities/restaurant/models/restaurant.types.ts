export type TRestaurantSortCriteria = "expensive" | "cheap" | "best";

import type { TRestaurantSchema } from "./restaurant.schema";
export type TRestaurant = TRestaurantSchema & { _id: string };
// export interface IRestaurant {
//     _id: string;
//     name: string;
//     short_description: string;
//     description: string;
//     images: string[];
//     cousine: string[];
//     rating: number[];
//     adress: string;
//     bill: number;
//     phone: string;
//     createdAt: Date;
//     title_image: string;
//     city: string;
//     coordinates: string;
//     subway: string[];
//     events: string[];
//     averageRating: number;
// }
export interface IContentItem {
    type: "rating" | "description" | "bill" | "cousines";
    value: number | string;
}

export interface IRestaurantSearchResult {
    name: string;
    _id: string;
}
