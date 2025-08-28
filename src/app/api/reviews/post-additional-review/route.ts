import { NextRequest, NextResponse } from "next/server";

import { postAdditionalReviewToExisting } from "@/entities/review/services/review.service";
import type { IAdditionalReview } from "@/entities/review/models/review.validators";

export const runtime = "nodejs";

export async function PATCH(request: NextRequest) {
    try {
        const userId = request.headers.get("x-user-id");
        const additionalReview: IAdditionalReview = await request.json();
        await postAdditionalReviewToExisting(additionalReview, userId!);
    } catch {
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}
