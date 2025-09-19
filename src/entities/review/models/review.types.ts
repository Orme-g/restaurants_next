import type { TReviewSchema } from "./review.schema";
export type TReview = TReviewSchema & { _id: string };
export type TReviewWithUserdata = Omit<TReview, "userId"> & {
    userId: {
        _id: string;
        username: string;
        avatar: string;
        reviews: number;
    };
};
