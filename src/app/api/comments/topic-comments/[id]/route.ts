import { NextRequest, NextResponse } from "next/server";
import {
    getTopicComments,
    // getTopicCommentsWithUserReactionFlag,
} from "@/entities/comment/services/comment.service";
import { connectMongoose } from "@/shared/db/mongoose";

export const runtime = "nodejs";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await connectMongoose();
    try {
        const { id } = await params;
        const topicComments = await getTopicComments(id);
        return NextResponse.json(topicComments, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(error.message, { status: 500 });
        }
    }
}
