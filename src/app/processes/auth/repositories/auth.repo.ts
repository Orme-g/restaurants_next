import "server-only";

import User from "../../../entities/user/models/user.schema";
import type { IUserData } from "@/app/entities/user/models/user.types";
import type { ClientSession } from "mongoose";

export async function findUserByUsername(
    username: string,
    session?: ClientSession
): Promise<IUserData | null> {
    const user = await User.findOne({ username })
        .session(session ?? null)
        .lean<IUserData>();
    return user;
}
