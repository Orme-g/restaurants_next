import { NextRequest, NextResponse } from "next/server";
import { connectMongoose } from "@/shared/db/mongoose";
import { listUserRatedComments } from "@/entities/user/services/users.service";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
    await connectMongoose();
    try {
        const userId = request.headers.get("x-user-id");
        const ratedCommentsList = await listUserRatedComments(userId!);
        return NextResponse.json(ratedCommentsList, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "Не удалось получить список" }, { status: 500 });
    }
}
