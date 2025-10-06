import "server-only";

import { Schema, model, models, InferSchemaType } from "mongoose";

const blogDataSchema = new Schema(
    {
        blogerName: { type: String, required: true },
        blogPosts: [String],
        blogerRating: { type: Number, default: 0 },
        aboutMe: { type: String, required: true },
        blogAvatar: { type: String, required: true },
        blogCity: String,
    },
    { _id: false }
);
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
            type: [String],
            default: "User",
            required: true,
        },
        birthday: Date,

        // registeAt: {
        //     // Changed to CreatedAt!
        //     type: Date,
        //     default: () => Date.now(),
        //     immutable: true,
        // },
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
            type: [String],
            default: [],
        },
        favouriteRestaurants: {
            type: [
                {
                    name: { type: String },
                    id: { type: String },
                    _id: false,
                },
            ],
            default: [],
        },
        ratedComments: {
            type: [String],
            default: [],
        },
        rating: { type: Number, default: 0 },
        bloger: {
            type: Boolean,
            default: false,
        },
        blogData: {
            type: blogDataSchema,
            default: null,
        },
        ratedBlogPosts: { type: [String], default: [] },
    },
    { timestamps: true }
);

export type TUserSchema = InferSchemaType<typeof userSchema>;
const User = models.User || model("User", userSchema);

export default User;
