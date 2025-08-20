import { NextRequest, NextResponse } from "next/server";

import { postAdditionalReviewToExisting } from "@/server/services/reviews.service";
import type { IAdditionalReview } from "@/shared/validators/reviews";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
    try {
        const userId = request.headers.get("x-user-id");
        const additionalReview: IAdditionalReview = await request.json();
        await postAdditionalReviewToExisting(additionalReview, userId!);
    } catch {
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}
