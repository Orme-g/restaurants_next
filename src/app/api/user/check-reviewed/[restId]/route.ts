import { NextRequest, NextResponse } from "next/server";
import { checkIfRestaurantReviewed } from "@/entities/user/services/users.service";
import { connectMongoose } from "@/shared/db/mongoose";
export const runtime = "nodejs";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ restId: string }> }
) {
    await connectMongoose();
    try {
        const { restId } = await params;
        const userId = request.headers.get("x-user-id");
        const isReviewed = await checkIfRestaurantReviewed(userId!, restId);
        return NextResponse.json(isReviewed, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "Не удалось получить список" }, { status: 500 });
    }
}
