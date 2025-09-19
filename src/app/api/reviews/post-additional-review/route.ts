import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { postAdditionalReviewToExisting } from "@/entities/review/services/review.service";
import { additionalReviewDTOSchema } from "@/entities/review/models/review.validators";

export const runtime = "nodejs";

export async function PATCH(request: NextRequest) {
    try {
        const userId = request.headers.get("x-user-id");
        const body = await request.json();
        const data = additionalReviewDTOSchema.parse(body);
        await postAdditionalReviewToExisting(data, userId!);
        revalidateTag(`reviews-${data.restId}`);
        return NextResponse.json("Success", { status: 200 });
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return NextResponse.json(error.message, { status: 500 });
        }
    }
}
