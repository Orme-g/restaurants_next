import { NextRequest, NextResponse } from "next/server";
import { connectMongoose } from "@/server/db/mongoose";
import { findRestaurantByUserCriterias } from "@/entities/restaurant/services/restaurant.service";
import { restaurantsSearchSchema } from "@/entities/restaurant/models/restaurant.validators";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
    await connectMongoose();
    try {
        const body = await request.json();
        const validatedBody = restaurantsSearchSchema.parse(body);
        const restaurantsSearchResult = await findRestaurantByUserCriterias(validatedBody);
        return NextResponse.json(restaurantsSearchResult, { status: 200 });
    } catch {
        return NextResponse.json({ message: "Error?!" }, { status: 500 });
    }
}
