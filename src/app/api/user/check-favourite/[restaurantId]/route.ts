import { NextRequest, NextResponse } from "next/server";
import { connectMongoose } from "@/shared/db/mongoose";
import { checkIfRestaurantFavourite } from "@/entities/user/services/users.service";

export const runtime = "nodejs";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ restaurantId: string }> }
) {
    await connectMongoose();
    try {
        const { restaurantId } = await params;
        const userId = request.headers.get("x-user-id");
        const isFavourite = await checkIfRestaurantFavourite(userId!, restaurantId);
        return NextResponse.json(isFavourite, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                {
                    message: `Ошибка проверки любимого ресторана: ${error.message}`,
                },
                { status: 500 }
            );
        }
    }
}
