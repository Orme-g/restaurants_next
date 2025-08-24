// import { NextRequest, NextResponse } from "next/server";
// import { getRestaurantsBySortCriteria } from "@/server/services/restaurants.service";

// export const runtime = "nodejs";

// export async function GET(
//     req: NextRequest,
//     { params }: { params: Promise<{ sort: "expensive" | "cheap" | "best" }> }
// ) {
//     try {
//         const { sort } = await params;
//         const { searchParams } = req.nextUrl;
//         const limit = Number(searchParams.get("limit"));
//         const restaurantsBySortCriteria = await getRestaurantsBySortCriteria(sort, limit);
//         return NextResponse.json(restaurantsBySortCriteria, { status: 200 });
//     } catch {
//         return NextResponse.json({ message: "Error" }, { status: 500 });
//     }
// }
