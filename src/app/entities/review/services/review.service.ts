import * as reviewsRepo from "../repositories/review.repo";
import * as usersRepo from "@/app/entities/user/repositories/users.repo";

import mongoose from "mongoose";

import { updateRestaurantRating } from "../../restaurant/services/restaurants.service";

import { INewReview, IAdditionalReview } from "@/app/entities/review/models/review.validators";

export const runtime = "nodejs";

export async function getAllReviewsForRestaurant(restaurantId: string) {
    return reviewsRepo.getReviewsByRestaurantId(restaurantId);
}

export async function postNewRestaurantReview(review: INewReview, userId: string) {
    const session = await mongoose.startSession();
    try {
        const { restaurant: restId, rating } = review;
        await session.withTransaction(async () => {
            const newReview = await reviewsRepo.saveNewRestaurantReview(review, session);
            const updatedRestaurant = await updateRestaurantRating(restId, rating, session);
            if (!updatedRestaurant) {
                throw new Error("Restaurant was not updated");
            }
            const updatedUser = await usersRepo.addReviewedRestaurantToUser(
                userId,
                restId,
                session
            );
            if (!updatedUser) {
                throw new Error("User was not updated");
            }
            return newReview;
        });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error while adding new review: ${error.message}`);
        }
        throw new Error("Error while adding new review.");
    } finally {
        await session.endSession();
    }
}

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
