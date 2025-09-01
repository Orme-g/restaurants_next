import "server-only";

import { Schema, model, models } from "mongoose";

const articleSchema = new Schema(
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

const Article = models.Article || model("Article", articleSchema, "doners");

export default Article;
