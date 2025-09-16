import { NextRequest, NextResponse } from "next/server";
import { postNewRestaurantReview } from "@/entities/review/services/review.service";
import { newReviewSchema } from "@/entities/review/models/review.validators";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
    try {
        const userId = request.headers.get("x-user-id");
        const body = await request.json();
        const data = newReviewSchema.parse(body);
        await postNewRestaurantReview(data, userId!);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }
}
