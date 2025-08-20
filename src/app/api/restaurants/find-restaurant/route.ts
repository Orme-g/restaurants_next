import { NextRequest, NextResponse } from "next/server";
import { findRestaurantByUserCriterias } from "@/server/services/restaurants.service";
import { restaurantsSearchSchema } from "@/shared/validators/restaurants";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validatedBody = restaurantsSearchSchema.parse(body);
        const restaurantsSearchResult = await findRestaurantByUserCriterias(validatedBody);
        return NextResponse.json(restaurantsSearchResult, { status: 200 });
    } catch {
        return NextResponse.json({ message: "Error?!" }, { status: 500 });
    }
}
