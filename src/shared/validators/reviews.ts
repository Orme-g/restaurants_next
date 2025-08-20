import { z } from "zod";

export const newReviewSchema = z.object({
    like: z.string(),
    dislike: z.string(),
    rating: z.number(),
    restaurant: z.string(),
    // userId from cookie
});
export type INewReview = z.infer<typeof newReviewSchema>;

export const additionalReviewSchema = z.object({
    reviewId: z.string(),
    like: z.string(),
    dislike: z.string(),
    rating: z.number(),
    restId: z.string(),
});
export type IAdditionalReview = z.infer<typeof additionalReviewSchema>;
