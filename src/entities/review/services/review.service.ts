import * as reviewsRepo from "../repositories/review.repo";
import * as usersRepo from "../../user/repositories/users.repo";

import mongoose from "mongoose";

import { updateRestaurantRating } from "../../restaurant/services/restaurant.service";

import { TAdditionalReviewDTO, TNewReviewDTO } from "../models/review.validators";

export const runtime = "nodejs";

export async function getAllReviewsForRestaurant(restaurantId: string) {
    return reviewsRepo.getReviewsByRestaurantId(restaurantId);
}

export async function postNewRestaurantReview(review: TNewReviewDTO, userId: string) {
    const session = await mongoose.startSession();
    try {
        const { restId, rating } = review;
        const reviewData = { ...review, userId, restaurant: restId };
        let newReview;
        await session.withTransaction(async () => {
            newReview = await reviewsRepo.saveNewRestaurantReview(reviewData, session);
            const updatedRestaurant = await updateRestaurantRating(restId, rating, session);
            if (!updatedRestaurant) {
                throw new Error("Не удалось обновить данные ресторана.");
            }
            try {
                await usersRepo.addReviewedRestaurantToUser(userId, restId, session);
            } catch {
                throw new Error("Не удалось обновить данные пользователя.");
            }
        });
        return newReview;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Не удалось добавить новый отзыв.");
    } finally {
        await session.endSession();
    }
}

export async function postAdditionalReviewToExisting(
    additionalReview: TAdditionalReviewDTO,
    userId: string
) {
    const session = await mongoose.startSession();
    try {
        let updatedReview;
        const { reviewId, like, dislike, rating, restId } = additionalReview;
        const added = new Date();
        await session.withTransaction(async () => {
            const reviewToUpdate = await reviewsRepo.getReviewById(reviewId, session);
            if (!reviewToUpdate) throw new Error("Отзыв не найден");
            if (reviewToUpdate.userId.toString() !== userId)
                throw new Error("Вы дополняете не свой отзыв");
            updatedReview = await reviewsRepo.addAdditionalReviewToExisting(
                reviewId,
                like,
                dislike,
                rating,
                added,
                session
            );
            await updateRestaurantRating(restId, rating, session);
        });
        return updatedReview;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Не удалось дополнить отзыв");
    } finally {
        await session.endSession();
    }
}
