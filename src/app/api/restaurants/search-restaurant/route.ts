import { NextRequest, NextResponse } from "next/server";
import { connectMongoose } from "@/server/db/mongoose";
import { serachRestaurantByUserInput } from "@/entities/restaurant/services/restaurant.service";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
    await connectMongoose();
    try {
        const { searchParams } = request.nextUrl;
        const input = searchParams.get("input");
        if (!input) {
            return NextResponse.json({ message: "Enter restaurant name" }, { status: 200 });
        }
        const result = await serachRestaurantByUserInput(input);
        return NextResponse.json(result, { status: 200 });
    } catch {
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}
