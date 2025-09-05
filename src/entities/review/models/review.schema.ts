import "server-only";

import { Schema, model, models, InferSchemaType } from "mongoose";

const reviewSchema = new Schema(
    {
        like: { type: String, required: true },
        dislike: { type: String, required: true },
        rating: { type: Number, required: true },
        restId: { type: String, required: true },
        userId: { type: String, required: true },
        additionalReview: {
            like: { type: String, required: true },
            dislike: { type: String, required: true },
            rating: { type: Number, required: true },
            added: { type: Date, default: () => Date.now() },
        },
    },
    { timestamps: true }
);
export type TReviewSchema = InferSchemaType<typeof reviewSchema>;
const Review = models.Review || model("Review", reviewSchema);

export default Review;
