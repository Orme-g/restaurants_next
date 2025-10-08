import { NextRequest, NextResponse } from "next/server";
import { getUserProfileData } from "@/entities/user/services/users.service";
import { connectMongoose } from "@/shared/db/mongoose";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
    await connectMongoose();
    try {
        const userId = request.headers.get("x-user-id");
        if (!userId) {
            throw new Error("User ID not found.");
        }
        const profileData = await getUserProfileData(userId);
        return NextResponse.json(profileData, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
        return NextResponse.json(
            { message: "Не удалось получить данные профиля" },
            { status: 500 }
        );
    }
}
