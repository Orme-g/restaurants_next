"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "@/shared/store/auth.store";
import { baseFetch } from "@/shared/api/baseFetch";
import type { IUserStoreData } from "@/entities/user/models/user.types";

interface IAuthProviderProps {
    children: React.ReactNode;
}
const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const { loginUser, logoutUser } = useAuthStore();
    useEffect(() => {
        baseFetch<IUserStoreData>("http://localhost:3000/api/auth/me")
            .then((data) => {
                loginUser(data);
            })
            .catch(() => logoutUser());
        // eslint-disable-next-line
    }, []);
    return <>{children}</>;
};
export default AuthProvider;
