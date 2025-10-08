import { NextRequest, NextResponse } from "next/server";
import { connectMongoose } from "@/shared/db/mongoose";
import { findRestaurantByUserCriterias } from "@/entities/restaurant/services/restaurant.service";
import { restaurantsSearchSchema } from "@/entities/restaurant/models/restaurant.validators";

import { ZodError } from "zod";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
    await connectMongoose();
    try {
        const body = await request.json();
        const validatedBody = restaurantsSearchSchema.parse(body);
        const restaurantsSearchResult = await findRestaurantByUserCriterias(validatedBody);
        return NextResponse.json(restaurantsSearchResult, { status: 200 });
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
        return NextResponse.json({ message: "Error?!" }, { status: 500 });
    }
}
