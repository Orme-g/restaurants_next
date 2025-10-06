import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, JWTPayload } from "jose";

interface CustomJWTPayload extends JWTPayload {
    id: string;
    role: string[];
}
const secretKey = process.env.JWT_SECRET;
if (!secretKey) throw new Error("JWT key is not provided!");
const secret = new TextEncoder().encode(secretKey);

export async function middleware(req: NextRequest) {
    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    try {
        const decoded = (await jwtVerify(accessToken, secret)).payload as CustomJWTPayload;
        const requestHeaders = new Headers(req.headers);
        requestHeaders.set("x-user-id", decoded.id);
        requestHeaders.set("x-user-role", decoded.role.join(","));
        return NextResponse.next({ request: { headers: requestHeaders } });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 403 });
        }
        return NextResponse.json({ message: "Forbidden: Invalid token!" }, { status: 403 });
    }
}

export const config = {
    matcher: [
        "/api/reviews/post-review",
        "/api/reviews/post-additional-review",
        "/api/auth/me",
        "/api/user/favourite-restaurants",
        "/api/user/check-favourite/:path*",
        "/api/user/check-reviewed/:path*",
        "/api/user/toggle-favourite",
        "/api/user/rated-comments",
        "/api/user/profile",
        "/api/user/blog-data",
        "/api/comments/post-comment",
        "/api/comments/evaluate-comment",
        "/api/comments/delete-comment",
    ],
};
