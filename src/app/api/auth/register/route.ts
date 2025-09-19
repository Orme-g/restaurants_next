import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/processes/auth/services/auth.service";
import { connectMongoose } from "@/shared/db/mongoose";
import { registerDataSchema } from "@/processes/auth/model/auth.validators";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
    await connectMongoose();
    try {
        const body = await request.json();
        const data = registerDataSchema.parse(body);
        await registerUser(data);
        return NextResponse.json({ message: "Регистрация прошла успешно" }, { status: 201 });
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return NextResponse.json(
                { message: `Ошибка регистрации: ${error.message}` },
                { status: 400 }
            );
        }
        return NextResponse.json({ message: `Неизвестная ошибка регистрации` }, { status: 500 });
    }
}
