import "server-only";

import Review from "../models/review.schema";
import type { IReview } from "@/app/entities/review/models/review.types";
import type { INewReview } from "@/app/entities/review/models/review.validators";
import type { ClientSession } from "mongoose";

export async function getReviewsByRestaurantId(restaurantId: string) {
    return Review.find({ restaurant: restaurantId }).sort({ createdAt: -1 }).lean();
}

export async function saveNewRestaurantReview(review: INewReview, session?: ClientSession) {
    const newReview = new Review(review);
    return newReview.save({ session });
}

export async function getReviewById(
    reviewId: string,
    session?: ClientSession
): Promise<IReview | null> {
    return Review.findById(reviewId)
        .session(session ?? null)
        .lean<IReview>();
}
export async function addAdditionalReviewToExisting(
    reviewId: string,
    like: string,
    dislike: string,
    rating: number,
    added: Date,
    session?: ClientSession
) {
    Review.findByIdAndUpdate(
        reviewId,
        {
            $set: { additionalReview: { like, dislike, rating, added } },
        },
        { session }
    );
}
