import { NextRequest, NextResponse } from "next/server";
import { connectMongoose } from "@/shared/db/mongoose";
import { newCommentSchema } from "@/entities/comment/models/comment.validators";
import { postNewComment } from "@/entities/comment/services/comment.service";

import { ZodError } from "zod";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
    await connectMongoose();
    try {
        const userId = request.headers.get("x-user-id");
        const body = await request.json();
        const data = newCommentSchema.parse(body);
        const newComment = await postNewComment(data, userId!);
        return NextResponse.json(newComment, { status: 201 });
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
        return NextResponse.json(
            { message: "Не удалось опубликовать комментарий" },
            { status: 500 }
        );
    }
}
