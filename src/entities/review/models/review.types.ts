import type { TReviewSchema } from "./review.schema";
export type TReview = TReviewSchema & { _id: string };

// export interface IReview {
//     _id: string;
//     like: string;
//     dislike: string;
//     rating: number;
//     restaurant: string;
//     createdAt: Date;
//     userId: string;
//     additionalReview?: {
//         like: string;
//         dislike: string;
//         rating: number;
//         added: Date;
//     };
// }
