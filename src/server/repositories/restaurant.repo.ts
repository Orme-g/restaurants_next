import "server-only";
import { connectMongoose } from "../db/mongoose";
import Restaurant from "../models/restaurant";

import type { IRestaurant } from "@/shared/types/restaurants";
import type { ClientSession } from "mongoose";

export async function getLastAddedRestaurants(limit = 6) {
    await connectMongoose();
    return Restaurant.find().sort({ createdAt: -1 }).limit(limit).lean();
}

export async function getRestaurantById(
    id: string,
    session?: ClientSession
): Promise<IRestaurant | null> {
    await connectMongoose();
    return Restaurant.findById(id)
        .session(session ?? null)
        .lean<IRestaurant>();
}

export async function getSortedRestaurants(
    sortType: { bill: 1 | -1 } | { averageRating: -1 },
    limit: number
) {
    await connectMongoose();
    return Restaurant.find().sort(sortType).limit(limit).lean();
}

export async function findRestaurantByCriteria(subway: string, cousine: string, sort: 1 | -1) {
    await connectMongoose();
    return Restaurant.find({ cousine: { $in: cousine }, subway: { $in: [subway] } })
        .sort({ bill: sort })
        .lean();
}

export async function findRestaurantByNameInput(input: string) {
    await connectMongoose();
    return Restaurant.find(
        { name: { $regex: new RegExp(input, "i") } },
        { name: 1, _id: 1 }
    ).lean();
}

export async function updateRatingAndAverageRating(
    restaurantId: string,
    rating: number,
    newAverageRating: number,
    session?: ClientSession
) {
    await connectMongoose();
    return Restaurant.findByIdAndUpdate(
        restaurantId,
        {
            $push: { rating },
            $set: { averageRating: newAverageRating },
        },
        { new: true, session }
    ).lean();
}
