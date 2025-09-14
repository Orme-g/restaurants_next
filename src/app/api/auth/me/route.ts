import { NextRequest, NextResponse } from "next/server";
import { connectMongoose } from "@/shared/db/mongoose";
import { getUserAuthData } from "@/entities/user/services/users.service";

export async function GET(request: NextRequest) {
    await connectMongoose();
    try {
        const userId = request.headers.get("x-user-id");
        if (!userId) {
            throw new Error("Ошибка получения ID пользователя");
        }
        const userAuthData = await getUserAuthData(userId);
        return NextResponse.json({ userAuthData }, { status: 200 });
    } catch {
        return NextResponse.json("Error", { status: 500 });
    }
}
