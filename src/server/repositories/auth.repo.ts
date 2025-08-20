import "server-only";

import { connectMongoose } from "../db/mongoose";

import User from "../models/user";
import type { IUserData } from "@/shared/types/user";
import type { ClientSession } from "mongoose";

export async function findUserByUsername(
    username: string,
    session?: ClientSession
): Promise<IUserData | null> {
    await connectMongoose();
    const user = await User.findOne({ username })
        .session(session ?? null)
        .lean<IUserData>();
    return user;
}
