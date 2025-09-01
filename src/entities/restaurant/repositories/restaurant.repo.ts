import "server-only";
import Restaurant from "../models/restaurant.schema";

import type { IRestaurant } from "../models/restaurant.types";
import type { ClientSession } from "mongoose";

export async function getLastAddedRestaurants(limit = 6): Promise<IRestaurant[]> {
    return Restaurant.find().sort({ createdAt: -1 }).limit(limit).lean<IRestaurant[]>();
}

export async function getRestaurantById(
    id: string,
    session?: ClientSession
): Promise<IRestaurant | null> {
    return Restaurant.findById(id)
        .session(session ?? null)
        .lean<IRestaurant>();
}

export async function getSortedRestaurants(
    sortType: { bill: 1 | -1 } | { averageRating: -1 },
    limit: number
): Promise<IRestaurant[]> {
    return Restaurant.find().sort(sortType).limit(limit).lean<IRestaurant[]>();
}

export async function findRestaurantByCriteria(
    subway: string,
    cousine: string,
    sort: 1 | -1
): Promise<IRestaurant[]> {
    return Restaurant.find({ cousine: { $in: cousine }, subway: { $in: [subway] } })
        .sort({ bill: sort })
        .lean<IRestaurant[]>();
}

export async function findRestaurantByNameInput(
    input: string
): Promise<{ name: string; _id: string }[]> {
    return Restaurant.find({ name: { $regex: new RegExp(input, "i") } }, { name: 1, _id: 1 }).lean<
        {
            name: string;
            _id: string;
        }[]
    >();
}

export async function updateRatingAndAverageRating(
    restaurantId: string,
    rating: number,
    newAverageRating: number,
    session?: ClientSession
) {
    return Restaurant.findByIdAndUpdate(
        restaurantId,
        {
            $push: { rating },
            $set: { averageRating: newAverageRating },
        },
        { new: true, session }
    ).lean();
}
