import { SignJWT, jwtVerify, JWTPayload } from "jose";

import bcrypt from "bcrypt";

import * as repo from "../repositories/auth.repo";

import type { ILoginData } from "@/processes/auth/model/auth.validators";

interface CustomJWTPayload extends JWTPayload {
    id: string;
}

const secretKey = process.env.JWT_SECRET;
if (!secretKey) throw new Error("JWT key is not provided!");
const secret = new TextEncoder().encode(secretKey);

export async function loginUser(loginData: ILoginData) {
    const { username, password } = loginData;
    const user = await repo.findUserByUsername(username);
    if (!user) throw new Error("Неверный логин или пароль");
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) throw new Error("Неверный логин или пароль");
    const accessToken = await new SignJWT({ id: user._id })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("15m")
        .sign(secret);
    const refreshToken = await new SignJWT({ id: user._id })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30d")
        .sign(secret);
    return {
        accessToken,
        refreshToken,
        name: user.name,
    };
}

export async function generateNewAccessToken(refreshToken: string) {
    try {
        const decoded = (await jwtVerify(refreshToken, secret)).payload as CustomJWTPayload;
        const userId = decoded.id;
        const newAccessToken = await new SignJWT({ id: userId })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("15m")
            .sign(secret);
        return newAccessToken;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error while generating new access token: ${error.message}`);
        }
        throw new Error("Error occured");
    }
}
