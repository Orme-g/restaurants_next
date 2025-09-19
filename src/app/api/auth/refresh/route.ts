import { NextRequest, NextResponse } from "next/server";

import { generateNewAccessToken } from "@/processes/auth/services/auth.service";

export async function POST(request: NextRequest) {
    try {
        const refreshToken = request.cookies.get("refreshToken")?.value;
        if (!refreshToken) {
            return NextResponse.json({ message: "Access forbidden" }, { status: 403 });
        }
        const newAccessToken = await generateNewAccessToken(refreshToken);
        const response = NextResponse.json({ message: "New access token issued" }, { status: 200 });
        response.cookies.set("accessToken", newAccessToken, {
            httpOnly: true,
            // secure: true, // Set for prod
            sameSite: "lax", // 'strict for prod'
            maxAge: 15 * 60,
            path: "/",
        });
        return response;
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 403 });
        }
        return NextResponse.json(
            { message: "Error, cannot refresh access token" },
            { status: 500 }
        );
    }
}
