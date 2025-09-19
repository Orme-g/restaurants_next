import { z } from "zod";

export const loginDataSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export type TLoginData = z.infer<typeof loginDataSchema>;

export const registerDataSchema = z.object({
    username: z.string(),
    name: z.string(),
    surname: z.string(),
    // birthday: z.date().nullable(),
    birthday: z.preprocess(
        (value) => (typeof value === "string" ? new Date(value) : value),
        z.date().nullable()
    ),
    email: z.string(),
    password: z.string(),
});

export type TRegisterData = z.infer<typeof registerDataSchema>;
