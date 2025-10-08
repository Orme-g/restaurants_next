import "server-only";

import User from "../models/user.schema";

import type { TUser } from "../models/user.types";
import type { ClientSession } from "mongoose";

export async function findUserById(userId: string, session?: ClientSession): Promise<TUser | null> {
    return User.findById(userId)
        .session(session ?? null)
        .lean<TUser>();
}

export async function isRestaurantFavourite(userId: string, restId: string): Promise<boolean> {
    const exists = await User.exists({
        _id: userId,
        "favouriteRestaurants.id": restId,
    });
    return Boolean(exists);
}

export async function isRestaurantReviewed(userId: string, restId: string): Promise<boolean> {
    const reviewed = await User.exists({
        _id: userId,
        reviewedRestaurants: restId,
    });
    return Boolean(reviewed);
}

export async function addReviewedRestaurantToUser(
    userId: string,
    restId: string,
    session?: ClientSession
): Promise<TUser | null> {
    return User.findByIdAndUpdate(
        userId,
        { $addToSet: { reviewedRestaurants: restId }, $inc: { reviews: 1 } },
        { new: true, session }
    ).lean<TUser>();
}

export async function addRestaurantToFavourites(
    userId: string,
    restId: string,
    restName: string
): Promise<TUser | null> {
    return User.findByIdAndUpdate(
        userId,
        {
            $addToSet: { favouriteRestaurants: { id: restId, name: restName } },
        },
        { new: true }
    ).lean<TUser>();
}
export async function removeRestaurantFromFavourites(
    userId: string,
    restId: string
): Promise<TUser | null> {
    return User.findByIdAndUpdate(
        userId,
        {
            $pull: { favouriteRestaurants: { id: restId } },
        },
        { new: true }
    ).lean<TUser>();
}

export async function updateUserCommentsField(
    userId: string,
    session?: ClientSession
): Promise<TUser | null> {
    return User.findByIdAndUpdate(
        userId,
        { $inc: { comments: 1 } },
        { session, new: true }
    ).lean<TUser>();
}

export async function addRatedComment(userId: string, commentId: string, session?: ClientSession) {
    await User.findByIdAndUpdate(userId, { $addToSet: { ratedComments: commentId } }, { session });
    return "updated";
}

export async function updateUserRating(userId: string, value: number, session?: ClientSession) {
    await User.findByIdAndUpdate(userId, { $inc: { rating: value } }, { session });
    return "updated";
}

export async function getUserRatedComments(userId: string): Promise<string[]> {
    const data = await User.findById(userId)
        .select("ratedComments")
        .lean<{ _id: string; ratedComments: string[] }>();
    return data?.ratedComments ?? [];
}

export async function setUserNewPassword(
    userId: string,
    newHashPass: string
): Promise<TUser | null> {
    return await User.findByIdAndUpdate(
        userId,
        {
            $set: { password: newHashPass },
        },
        { new: true }
    ).lean<TUser>();
}
