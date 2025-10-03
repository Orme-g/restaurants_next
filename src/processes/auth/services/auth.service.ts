import { SignJWT, jwtVerify, JWTPayload } from "jose";

import bcrypt from "bcrypt";

import * as authRepo from "../repositories/auth.repo";
import * as usersRepo from "@/entities/user/repositories/users.repo";
// import * as usersRepo from "@/entities/user/repositories/users.repo";

import type { TLoginData, TRegisterData } from "@/processes/auth/model/auth.validators";

interface CustomJWTPayload extends JWTPayload {
    id: string;
}

const secretKey = process.env.JWT_SECRET;
if (!secretKey) throw new Error("JWT key is not provided!");
const secret = new TextEncoder().encode(secretKey);

export async function registerUser(registerData: TRegisterData) {
    const { username, password } = registerData;
    const userExist = await authRepo.findUserByUsername(username);
    if (userExist) {
        throw new Error("Пользователь с таким именем уже существует");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await authRepo.createNewUser({ ...registerData, password: hashPassword });
    return newUser;
}

export async function loginUser(loginData: TLoginData) {
    const { username, password } = loginData;
    const user = await authRepo.findUserByUsername(username);
    if (!user) throw new Error("Неверный логин или пароль");
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) throw new Error("Неверный логин или пароль");
    const accessToken = await new SignJWT({ id: user._id.toString(), role: user.role })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("15m")
        .sign(secret);
    const refreshToken = await new SignJWT({ id: user._id.toString() })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30d")
        .sign(secret);
    return {
        accessToken,
        refreshToken,
        name: user.name,
        username: user.username,
        id: user._id,
        role: user.role,
    };
}

// export async function getUserAuthData(userId: string) {
//     const user = await usersRepo.findUserById(userId);
//     if (!user) {
//         throw new Error("Пользователь не найден");
//     }
//     return { name: user.name, username: user.username, id: user._id, role: user.role };
// }

export async function generateNewAccessToken(refreshToken: string) {
    try {
        const decoded = (await jwtVerify(refreshToken, secret)).payload as CustomJWTPayload;
        const userId = decoded.id;
        const user = await usersRepo.findUserById(userId);
        if (!user) {
            throw new Error("Ошибка генерации токена: Пользователь не найден!");
        }
        const newAccessToken = await new SignJWT({ id: userId, role: user.role })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("15m")
            .sign(secret);
        return newAccessToken;
    } catch (error) {
        throw error;
    }
}
