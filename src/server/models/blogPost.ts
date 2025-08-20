import "server-only";

import { Schema, model, models } from "mongoose";

const blogPostSchema = new Schema(
    {
        userId: String,
        title: String,
        subtitle: String,
        title_image: String,
        short_description: String,
        content: Object,
        themes: Array,
        likes: Number,
        createdAt: {
            type: Date,
            default: () => Date.now(),
        },
    },
    { timestamps: true }
);

const BlogPost = models.BlogPost || model("BlogPost", blogPostSchema);

export default BlogPost;
