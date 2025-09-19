import { z } from "zod";

export const newReviewDTO = z.object({
    like: z.string(),
    dislike: z.string(),
    rating: z.number(),
    restId: z.string(),
});
export type TNewReviewDTO = z.infer<typeof newReviewDTO>;

export const newReviewSchema = z.object({
    like: z.string(),
    dislike: z.string(),
    rating: z.number(),
    restaurant: z.string(),
    userId: z.string(),
});
export type TNewReview = z.infer<typeof newReviewSchema>;

export const additionalReviewDTOSchema = z.object({
    reviewId: z.string(),
    like: z.string(),
    dislike: z.string(),
    rating: z.number(),
    restId: z.string(),
});
export type TAdditionalReviewDTO = z.infer<typeof additionalReviewDTOSchema>;
