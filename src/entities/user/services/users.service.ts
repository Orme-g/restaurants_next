import * as usersRepo from "../repositories/users.repo";

export const runtime = "nodejs";

export async function getUserById(userId: string) {
    const user = await usersRepo.findUserById(userId);
    if (!user) {
        throw new Error("Пользователь не найден");
    }
    return user;
}
export async function getUserAuthData(userId: string) {
    const user = await usersRepo.findUserById(userId);
    if (!user) {
        throw new Error("Пользователь не найден");
    }
    return { name: user.name, username: user.username, id: user._id, role: user.role };
}
