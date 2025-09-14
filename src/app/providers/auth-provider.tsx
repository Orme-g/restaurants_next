"use client";

import React, { useEffect } from "react";
import { authStore } from "@/shared/store/auth.store";
// import { fetchWithAutoRefresh } from "@/shared/api/fetchWithAutoRefresh";
import { baseFetch } from "@/shared/api/baseFetch";
import type { IUserStoreData } from "@/entities/user/models/user.types";

interface IAuthProviderProps {
    children: React.ReactNode;
}
const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const setUserData = authStore((state) => state.loginUser);
    useEffect(() => {
        baseFetch<IUserStoreData>("http://localhost:3000/api/auth/me")
            // .then((response) => {
            //     if (!response.ok) {
            //         throw new Error("Unauthorised");
            //     }
            //     return response.json();
            // })
            .then((data) => setUserData(data))
            .catch((error) => console.log(error));
    }, []);
    return <>{children}</>;
};
export default AuthProvider;
