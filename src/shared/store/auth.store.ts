import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { IUserStoreData } from "@/entities/user/models/user.types";

interface IAuthState {
    isAuth: boolean | null;
    userData: IUserStoreData | null;
    loginUser: (data: IUserStoreData) => void;
    logoutUser: () => void;
}

export const useAuthStore = create<IAuthState>()(
    devtools((set) => ({
        isAuth: null,
        userData: null,
        loginUser: (data: IUserStoreData) => set({ userData: data, isAuth: true }),
        logoutUser: () => set({ userData: null, isAuth: false }),
    }))
);
