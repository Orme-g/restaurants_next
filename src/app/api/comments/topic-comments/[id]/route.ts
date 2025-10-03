import { NextRequest, NextResponse } from "next/server";
import { getTopicComments } from "@/entities/comment/services/comment.service";
import { connectMongoose } from "@/shared/db/mongoose";

export const runtime = "nodejs";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await connectMongoose();
    try {
        const { id } = await params;
        const commentsNumber = Number(request.nextUrl.searchParams.get("comments-number") ?? 10);
        const cursor = request.nextUrl.searchParams.get("cursor");
        const topicComments = await getTopicComments(id, commentsNumber, cursor ?? undefined);
        return NextResponse.json(topicComments, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(error.message, { status: 500 });
        }
    }
}
