import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json({ message: "Выход из профиля" }, { status: 200 });
        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");
        return response;
    } catch {
        return NextResponse.json({ message: "Error when logout" }, { status: 500 });
    }
}
