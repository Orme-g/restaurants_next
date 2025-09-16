import "server-only";

import User from "../models/user.schema";

import type { TUser } from "../models/user.types";
import type { ClientSession } from "mongoose";

export async function findUserById(userId: string, session?: ClientSession): Promise<TUser | null> {
    return User.findById(userId)
        .session(session ?? null)
        .lean<TUser>();
}

export async function isRestaurantFavourite(userId: string, restId: string) {
    const exists = await User.exists({
        _id: userId,
        "favouriteRestaurants.id": restId,
    });
    return Boolean(exists);
}

export async function addReviewedRestaurantToUser(
    userId: string,
    restId: string,
    session?: ClientSession
) {
    return User.findByIdAndUpdate(
        userId,
        { $addToSet: { reviewedRestaurants: restId }, $inc: { reviews: 1 } },
        { new: true, session }
    );
}

export async function addRestaurantToFavourites(userId: string, restId: string, restName: string) {
    return User.findByIdAndUpdate(userId, {
        $addToSet: { favouriteRestaurants: { id: restId, name: restName } },
    });
}
export async function removeRestaurantFromFavourites(userId: string, restId: string) {
    return User.findByIdAndUpdate(userId, {
        $pull: { favouriteRestaurants: { id: restId } },
    });
}
