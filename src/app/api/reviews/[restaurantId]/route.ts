import { NextRequest, NextResponse } from "next/server";
import { getAllReviewsForRestaurant } from "@/server/services/reviews.service";

export const runtime = "nodejs";

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ restaurantId: string }> }
) {
    try {
        const { restaurantId } = await params;
        const restaurantReviews = await getAllReviewsForRestaurant(restaurantId);
        return NextResponse.json(restaurantReviews, { status: 200 });
    } catch {
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}
