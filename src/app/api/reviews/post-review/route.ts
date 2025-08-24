import { NextRequest, NextResponse } from "next/server";

import { postNewRestaurantReview } from "@/app/entities/review/services/review.service";

import type { INewReview } from "@/app/entities/review/models/review.validators";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
    try {
        const userId = request.headers.get("x-user-id");
        const reviewData: INewReview = await request.json();
        await postNewRestaurantReview(reviewData, userId!);
    } catch {}
}
export async function GET() {
    return NextResponse.json({ message: "Get request received" }, { status: 200 });
}
