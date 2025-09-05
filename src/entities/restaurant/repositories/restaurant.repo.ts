import "server-only";
import Restaurant from "../models/restaurant.schema";

import type { TRestaurant } from "../models/restaurant.types";
import type * as mongoose from "mongoose";

export async function getLastAddedRestaurants(limit = 6): Promise<TRestaurant[]> {
    return Restaurant.find().sort({ createdAt: -1 }).limit(limit).lean<TRestaurant[]>();
}

export async function getRestaurantById(
    id: string,
    session?: mongoose.ClientSession
): Promise<TRestaurant | null> {
    return Restaurant.findById(id)
        .session(session ?? null)
        .lean<TRestaurant>();
}

export async function getSortedRestaurants(
    sortType: { bill: 1 | -1 } | { averageRating: -1 },
    limit: number
): Promise<TRestaurant[]> {
    return Restaurant.find().sort(sortType).limit(limit).lean<TRestaurant[]>();
}

export async function findRestaurantByCriteria(
    subway: string,
    cousine: string,
    sort: 1 | -1
): Promise<TRestaurant[]> {
    return Restaurant.find({ cousine: { $in: cousine }, subway: { $in: [subway] } })
        .sort({ bill: sort })
        .lean<TRestaurant[]>();
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
    session?: mongoose.ClientSession
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
