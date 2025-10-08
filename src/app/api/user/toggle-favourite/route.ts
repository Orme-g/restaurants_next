import { NextRequest, NextResponse } from "next/server";
import { connectMongoose } from "@/shared/db/mongoose";
import { toggleFavouriteRestaurant } from "@/entities/user/services/users.service";
import { handleFavouriteSchema } from "@/entities/user/models/user.validators";

import { ZodError } from "zod";

export const runtime = "nodejs";

export async function PATCH(request: NextRequest) {
    await connectMongoose();
    try {
        const userId = request.headers.get("x-user-id");
        const body = await request.json();
        const data = handleFavouriteSchema.parse(body);
        const result = await toggleFavouriteRestaurant(
            userId!,
            data.restId,
            data.restName,
            data.favourite
        );
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { message: "Данные не прошли валидацию на сервере" },
                { status: 400 }
            );
        }
        if (error instanceof Error) {
            return NextResponse.json(
                { message: `Ошибка при работе с избранным рестораном: ${error.message}` },
                { status: 500 }
            );
        }
    }
}
