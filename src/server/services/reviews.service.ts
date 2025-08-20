import * as reviewsRepo from "../repositories/reviews.repo";
import mongoose from "mongoose";

import { updateRestaurantRating } from "./restaurants.service";
import { IAdditionalReview } from "@/shared/validators/reviews";

export const runtime = "nodejs";

export async function getAllReviewsForRestaurant(restaurantId: string) {
    return reviewsRepo.getReviewsByRestaurantId(restaurantId);
}

// export async function postNewRestaurantReview(review: INewReview) {}

export async function postAdditionalReviewToExisting(
    additionalReview: IAdditionalReview,
    userId: string
) {
    const session = await mongoose.startSession();
    try {
        const { reviewId, like, dislike, rating, restId } = additionalReview;
        const added = new Date();
        await session.withTransaction(async () => {
            const reviewToUpdate = await reviewsRepo.getReviewById(reviewId, session);
            if (!reviewToUpdate) throw new Error("Отзыв не найден");
            if (reviewToUpdate.userId.toString() !== userId)
                throw new Error("Вы дополняете не свой отзыв");
            await reviewsRepo.addAdditionalReviewToExisting(
                reviewId,
                like,
                dislike,
                rating,
                added,
                session
            );
            await updateRestaurantRating(restId, rating, session);
        });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Error when making additional review");
    } finally {
        await session.endSession();
    }
}
