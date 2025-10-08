import { NextRequest, NextResponse } from "next/server";
import { connectMongoose } from "@/shared/db/mongoose";
import { changePasswordSchema } from "@/entities/user/models/user.validators";
import { changeUserPassword } from "@/entities/user/services/users.service";

import { ZodError } from "zod";

export const runtime = "nodejs";

export async function PATCH(request: NextRequest) {
    await connectMongoose();
    try {
        const userId = request.headers.get("x-user-id");
        const body = await request.json();
        const data = changePasswordSchema.parse(body);
        if (!userId) {
            throw new Error("User ID not found.");
        }
        const result = await changeUserPassword(userId, data.oldPass, data.newPass);
        return NextResponse.json(result, { status: 200 });
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
        return NextResponse.json({ message: "Не удалось изменить пароль" }, { status: 500 });
    }
}
