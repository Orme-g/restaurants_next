import { NextRequest, NextResponse } from "next/server";
import { serachRestaurantByUserInput } from "@/server/services/restaurants.service";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
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
