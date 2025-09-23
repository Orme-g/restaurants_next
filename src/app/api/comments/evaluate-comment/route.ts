import { NextRequest, NextResponse } from "next/server";
import { connectMongoose } from "@/shared/db/mongoose";
import { evaluateComment } from "@/entities/comment/services/comment.service";
import { evaluateCommentSchema } from "@/entities/comment/models/comment.validators";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
    await connectMongoose();
    try {
        const userId = request.headers.get("x-user-id");
        const body = await request.json();
        const data = evaluateCommentSchema.parse(body);
        await evaluateComment(data, userId!);
        return NextResponse.json("Evaluated", { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(error.message, { status: 500 });
        }
    }
}
