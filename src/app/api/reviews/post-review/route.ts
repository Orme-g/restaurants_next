import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { postNewRestaurantReview } from "@/entities/review/services/review.service";
import { newReviewDTO } from "@/entities/review/models/review.validators";

import { ZodError } from "zod";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
    try {
        const userId = request.headers.get("x-user-id");
        const body = await request.json();
        const data = newReviewDTO.parse(body);
        await postNewRestaurantReview(data, userId!);
        revalidateTag(`reviews-${data.restId}`);
        return NextResponse.json({ message: "Added" }, { status: 201 });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { message: "Данные не прошли валидацию на сервере" },
                { status: 400 }
            );
        }
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }
}
