import { NextRequest } from "next/server";

export async function GET() {
    const data = {
        name: "SomeName",
        surname: "SomeSurname",
    };
    return new Response(JSON.stringify(data));
}
export async function POST(request: NextRequest) {
    return new Response(request.body);
}
