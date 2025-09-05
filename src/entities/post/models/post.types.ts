import type { TBlogPostSchema } from "./post.schema";

export type TBlogPost = TBlogPostSchema & { _id: string };
