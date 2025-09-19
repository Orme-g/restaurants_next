import "server-only";

import { Schema, model, models, InferSchemaType } from "mongoose";
const additionalReviewSchema = new Schema(
    {
        like: { type: String, required: true },
        dislike: { type: String, required: true },
        rating: { type: Number, required: true },
        added: { type: Date, default: () => Date.now(), required: true },
    },
    { _id: false }
);
const reviewSchema = new Schema(
    {
        like: { type: String, required: true },
        dislike: { type: String, required: true },
        rating: { type: Number, required: true },
        restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        additionalReview: { type: additionalReviewSchema, required: false, default: undefined },
    },
    { timestamps: true }
);
export type TReviewSchema = InferSchemaType<typeof reviewSchema>;
const Review = models.Review || model("Review", reviewSchema);

export default Review;
