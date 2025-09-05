import "server-only";

import { Schema, model, models, InferSchemaType } from "mongoose";

const restaurantSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            uppercase: true,
        },
        short_description: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        images: [
            {
                type: String,
                required: true,
            },
        ],
        title_image: {
            type: String,
            required: true,
        },
        cousine: [
            {
                type: String,
                required: true,
            },
        ],

        rating: {
            type: [Number],
            default: [],
        },
        adress: {
            type: String,
            required: true,
        },
        bill: {
            type: Number,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        coordinates: { type: String, required: true },
        subway: [{ type: String }],
        events: [String],
        averageRating: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

// restaurantSchema.pre("save", function (next) {
//     if (this.isModified("rating")) {
//         this.averageRating = Number(
//             (this.rating.reduce((acc, val) => acc + val, 0) / this.rating.length).toFixed(3)
//         );
//     }
//     next();
// });
export type TRestaurantSchema = InferSchemaType<typeof restaurantSchema>;
const Restaurant = models.Restaurant || model("Restaurant", restaurantSchema);

export default Restaurant;
