import "server-only";

import { Schema, model, models } from "mongoose";

const donerSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        subtitle: String,
        title_image: String,
        short_description: {
            type: String,
            required: true,
        },
        content: Object,

        author: String,
        rating: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const Doner = models.Doner || model("Doner", donerSchema);

export default Doner;
