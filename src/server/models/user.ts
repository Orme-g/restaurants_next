import "server-only";

import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        surname: String,

        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        role: {
            type: Array,
            default: "User",
            required: true,
        },
        birthday: Date,

        registeAt: {
            // Change to CreatedAt!
            type: Date,
            default: () => Date.now(),
            immutable: true,
        },
        avatar: {
            type: String,
            default: null,
        },

        comments: {
            type: Number,
            default: 0,
        },
        reviews: {
            type: Number,
            default: 0,
        },
        reviewedRestaurants: {
            type: Array,
        },
        favouriteRestaurants: [],
        ratedComments: [],
        rating: Number,
        bloger: {
            type: Boolean,
            default: false,
        },
        blogData: {
            type: Object,
            default: null,
        },
        ratedBlogPosts: Array,
    },
    { timestamps: true }
);

const User = models.User || model("User", userSchema);

export default User;
