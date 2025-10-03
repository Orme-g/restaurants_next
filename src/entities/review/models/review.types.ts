import type { TReviewSchema } from "./review.schema";
export type TReview = Omit<TReviewSchema, "userId" | "restaurant"> & {
    _id: string;
    userId: string;
    restaurant: string;
};
export type TReviewWithUserdata = Omit<TReview, "userId"> & {
    userId: {
        _id: string;
        username: string;
        avatar: string;
        reviews: number;
    };
};
