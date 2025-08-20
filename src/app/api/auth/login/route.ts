import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "@/server/services/auth.service";
import type { ILoginData } from "@/shared/validators/auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
    try {
        const loginData: ILoginData = await request.json();
        const result = await loginUser(loginData);
        const { accessToken, refreshToken, name } = result;
        const response = NextResponse.json({ message: `Здравствуйте, ${name}` });
        response.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 15 * 60,
        });
        response.cookies.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60,
        });
        return response;
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "Неизвестная ошибка авторизации" }, { status: 500 });
    }
}
