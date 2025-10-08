import { NextRequest, NextResponse } from "next/server";
import { getAllReviewsForRestaurant } from "@/entities/review/services/review.service";
import { connectMongoose } from "@/shared/db/mongoose";

export const runtime = "nodejs";

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ restaurantId: string }> }
) {
    try {
        await connectMongoose();
        const { restaurantId } = await params;
        const restaurantReviews = await getAllReviewsForRestaurant(restaurantId);
        return NextResponse.json(restaurantReviews, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "Error?!" }, { status: 500 });
    }
}
