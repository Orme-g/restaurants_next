import "server-only";

import { Schema, model, models, InferSchemaType } from "mongoose";

const articleSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        subtitle: { type: String, required: true },
        title_image: { type: String, required: true },
        short_description: {
            type: String,
            required: true,
        },
        content: {
            type: [Schema.Types.Mixed],
            required: true,
        },

        author: { type: String, required: true },
        rating: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

export type TArticleSchema = InferSchemaType<typeof articleSchema>;

const Article = models.Article || model("Article", articleSchema, "doners");

export default Article;
