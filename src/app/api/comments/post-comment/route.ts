import { NextRequest, NextResponse } from "next/server";
import { connectMongoose } from "@/shared/db/mongoose";
import { newCommentSchema } from "@/entities/comment/models/comment.validators";
import { postNewComment } from "@/entities/comment/services/comment.service";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
    await connectMongoose();
    try {
        const userId = request.headers.get("x-user-id");
        const body = await request.json();
        const data = newCommentSchema.parse(body);
        await postNewComment(data, userId!);
        return NextResponse.json("Success", { status: 201 });
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }
}
