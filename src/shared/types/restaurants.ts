export type TRestaurantSortCriteria = "expensive" | "cheap" | "best";

export interface IRestaurant {
    _id?: string;
    name: string;
    short_description: string;
    description: string;
    images: string[];
    cousine: string[];
    rating: number[];
    adress: string;
    bill: number;
    phone: string;
    createdAt: Date;
    title_image: string;
    city: string;
    coordinates: string;
    subway: string[];
    events: string[];
    averageRating: number;
}
