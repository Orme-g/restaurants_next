import "server-only";

import Review from "../models/review.schema";
import type { TReview, TReviewWithUserdata } from "../models/review.types";
import type { TNewReview } from "../models/review.validators";
import type { ClientSession } from "mongoose";

export async function getReviewsByRestaurantId(
    restaurantId: string
): Promise<TReviewWithUserdata[]> {
    return Review.find({ restaurant: restaurantId })
        .sort({ createdAt: -1 })
        .populate("userId", "username avatar reviews")
        .lean<TReviewWithUserdata[]>();
}

export async function saveNewRestaurantReview(
    review: TNewReview,
    session?: ClientSession
): Promise<TReview> {
    const newReview = new Review(review);
    const saved = await newReview.save({ session });
    return saved.toObject();
}

export async function getReviewById(
    reviewId: string,
    session?: ClientSession
): Promise<TReview | null> {
    return Review.findById(reviewId)
        .session(session ?? null)
        .lean<TReview>();
}
export async function addAdditionalReviewToExisting(
    reviewId: string,
    like: string,
    dislike: string,
    rating: number,
    added: Date,
    session?: ClientSession
): Promise<TReview | null> {
    return Review.findByIdAndUpdate(
        reviewId,
        {
            $set: { additionalReview: { like, dislike, rating, added } },
        },
        { session, new: true }
    ).lean<TReview>();
}
