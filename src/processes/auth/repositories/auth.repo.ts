import "server-only";

import User from "../../../entities/user/models/user.schema";
import type { TUser } from "@/entities/user/models/user.types";
import type { TRegisterData } from "../model/auth.validators";
import type { ClientSession } from "mongoose";

export async function findUserByUsername(
    username: string,
    session?: ClientSession
): Promise<TUser | null> {
    const user = await User.findOne({ username })
        .session(session ?? null)
        .lean<TUser>();
    return user;
}

export async function createNewUser(data: TRegisterData): Promise<TUser> {
    const user = new User(data);
    const newUser = await user.save();
    return newUser.toObject();
}
