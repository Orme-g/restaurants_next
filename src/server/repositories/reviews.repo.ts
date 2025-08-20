import "server-only";

import { connectMongoose } from "../db/mongoose";

import Review from "../models/review";
import type { IReview } from "@/shared/types/review";
// import type { INewReview } from "@/shared/validators/reviews";
import type { ClientSession } from "mongoose";

export async function getReviewsByRestaurantId(restaurantId: string) {
    await connectMongoose();
    return Review.find({ restaurant: restaurantId }).sort({ createdAt: -1 }).lean();
}

// export async function postNewReview(review: INewReview, session?: ClientSession) {
//     await connectMongoose();
// }

export async function getReviewById(
    reviewId: string,
    session?: ClientSession
): Promise<IReview | null> {
    await connectMongoose();
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
    await connectMongoose();
    Review.findByIdAndUpdate(
        reviewId,
        {
            $set: { additionalReview: { like, dislike, rating, added } },
        },
        { session }
    );
}
