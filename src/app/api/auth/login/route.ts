import { NextRequest, NextResponse } from "next/server";
import { connectMongoose } from "@/shared/db/mongoose";
import { loginUser } from "@/processes/auth/services/auth.service";
import { loginDataSchema } from "@/processes/auth/model/auth.validators";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
    await connectMongoose();
    try {
        const body = await request.json();
        const data = loginDataSchema.parse(body);
        const result = await loginUser(data);
        const { accessToken, refreshToken, name, username, id, role } = result;
        const userData = { name, username, id, role };
        const response = NextResponse.json(userData, { status: 200 });
        response.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            // secure: true,  // Set for prod
            sameSite: "lax", // 'strict for prod'
            maxAge: 15 * 60,
            path: "/",
        });
        response.cookies.set("refreshToken", refreshToken, {
            httpOnly: true,
            // secure: true, // Set for prod
            sameSite: "lax", // 'strict for prod'
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
        });
        return response;
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 401 });
        }
        return NextResponse.json({ message: "Неизвестная ошибка авторизации" }, { status: 401 });
    }
}
