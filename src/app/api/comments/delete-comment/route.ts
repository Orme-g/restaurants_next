import { NextRequest, NextResponse } from "next/server";
import { connectMongoose } from "@/shared/db/mongoose";
import { deleteComment } from "@/entities/comment/services/comment.service";
import { deleteCommentSchema } from "@/entities/comment/models/comment.validators";

import { ZodError } from "zod";

export const runtime = "nodejs";

export async function PATCH(request: NextRequest) {
    await connectMongoose();
    try {
        const roles = request.headers.get("x-user-role")?.split(",") || [];
        if (!roles.includes("admin")) {
            return NextResponse.json("У вас нет прав для данного действия.", { status: 403 });
        }
        const body = await request.json();
        const data = deleteCommentSchema.parse(body);
        const deletedComment = await deleteComment(data);
        return NextResponse.json(deletedComment, { status: 200 });
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
        return NextResponse.json({ message: "Не удалось удалить комментарий" }, { status: 500 });
    }
}
