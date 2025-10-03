import type { TBlogPostSchema } from "./post.schema";

export type TBlogPost = Omit<TBlogPostSchema, "userId"> & { _id: string; userId: string };
