import "server-only";

import { Schema, model, models, InferSchemaType } from "mongoose";

const blogPostSchema = new Schema(
    {
        userId: { type: String, required: true },
        title: { type: String, required: true },
        subtitle: { type: String, required: true },
        title_image: { type: String, required: true },
        short_description: { type: String, required: true },
        content: { type: [Schema.Types.Mixed], required: true },
        tags: { type: [String], required: true },
        likes: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export type TBlogPostSchema = InferSchemaType<typeof blogPostSchema>;

const BlogPost = models.BlogPost || model("BlogPost", blogPostSchema);

export default BlogPost;
