import "server-only";

import { Schema, model, models } from "mongoose";

const reviewSchema = new Schema(
    {
        name: String,
        avatar: String,
        like: String,
        dislike: String,
        rating: Number,
        restaurant: String,
        userId: String,
        additionalReview: {
            like: String,
            dislike: String,
            rating: Number,
            added: Date,
        },
    },
    { timestamps: true }
);

const Review = models.Review || model("Review", reviewSchema);

export default Review;
