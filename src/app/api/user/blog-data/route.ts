import { NextRequest, NextResponse } from "next/server";
import { connectMongoose } from "@/shared/db/mongoose";
import { getUserBlogData } from "@/entities/user/services/users.service";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
    await connectMongoose();
    try {
        const userId = request.headers.get("x-user-id");
        if (!userId) {
            throw new Error("User ID not found.");
        }
        const blogData = await getUserBlogData(userId);
        return NextResponse.json(blogData, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "Не удалось получить данные" }, { status: 500 });
    }
}
