"use client";
import React from "react";
import ReviewCard from "./ReviewCard";
import ReviewCardWithAddition from "./ReviewCardWithAddition";
import ReviewCardWithForm from "./ReviewCardWithForm";
import { useAuthStore } from "@/shared/store/auth.store";
import type { TReviewWithUserdata } from "../../models/review.types";

interface IReviewCardWrapperProps {
    data: TReviewWithUserdata;
}
const ReviewCardWrapper: React.FC<IReviewCardWrapperProps> = ({ data }) => {
    const userData = useAuthStore((state) => state.userData);
    const id = userData?.id;
    if (data.additionalReview) {
        return <ReviewCardWithAddition data={data} />;
    }
    if (id && id === data.userId._id) {
        return <ReviewCardWithForm data={data} />;
    }
    return <ReviewCard data={data} />;
};
export default ReviewCardWrapper;
