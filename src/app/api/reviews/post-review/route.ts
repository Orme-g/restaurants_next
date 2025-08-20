import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
    console.log("Should not come here!");
    try {
        const userId = request.headers.get("x-user-id");
        console.log("User id:", userId);
        return NextResponse.json({ message: "Id received", userId }, { status: 200 });
    } catch {}
}
export async function GET() {
    return NextResponse.json({ message: "Get request received" }, { status: 200 });
}
