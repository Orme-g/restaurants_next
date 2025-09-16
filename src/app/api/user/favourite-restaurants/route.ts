import { NextRequest, NextResponse } from "next/server";
import { getUserFavouriteRestaurantsList } from "@/entities/user/services/users.service";
import { connectMongoose } from "@/shared/db/mongoose";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
    await connectMongoose();
    try {
        const userId = request.headers.get("x-user-id");
        const response = await getUserFavouriteRestaurantsList(userId!);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: `Ошибка получения списка любимых ресторанов: ${error.message}`,
            });
        }
    }
}
