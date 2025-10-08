import { NextRequest, NextResponse } from "next/server";
import { connectMongoose } from "@/shared/db/mongoose";
import { getRestaurantProfile } from "@/entities/restaurant/services/restaurant.service";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await connectMongoose();
    try {
        const { id } = await params;
        const data = await getRestaurantProfile(id);
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}
