import type { TUserSchema } from "./user.schema";
export type TUser = TUserSchema & { _id: string };
export interface IUserStoreData {
    name: string;
    id: string;
    role: string[];
    username: string;
}

export interface IUserProfileDTO {
    avatar: string;
    name: string;
    username: string;
    email: string;
    comments: number;
    reviews: number;
    favouriteRestaurants: { name: string; id: string }[];
    createdAt: Date;
}
