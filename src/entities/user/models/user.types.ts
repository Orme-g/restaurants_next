import type { TUserSchema } from "./user.schema";
export type TUser = TUserSchema & { _id: string };
export interface IUserStoreData {
    name: string;
    id: string;
    role: string[];
    username: string;
}
