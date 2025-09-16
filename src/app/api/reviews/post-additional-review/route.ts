import { NextRequest, NextResponse } from "next/server";

import { postAdditionalReviewToExisting } from "@/entities/review/services/review.service";
import { additionalReviewSchema } from "@/entities/review/models/review.validators";

export const runtime = "nodejs";

export async function PATCH(request: NextRequest) {
    try {
        const userId = request.headers.get("x-user-id");
        const body = await request.json();
        const data = additionalReviewSchema.parse(body);
        await postAdditionalReviewToExisting(data, userId!);
    } catch {
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}
