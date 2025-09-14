"use client";
import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { TanstackProvider } from "./tanstack-provider";
import AuthProvider from "./auth-provider";

interface IAppProviders {
    children: React.ReactNode;
}
const AppProviders: React.FC<IAppProviders> = ({ children }) => {
    return (
        <AppRouterCacheProvider>
            <TanstackProvider>
                <AuthProvider>{children}</AuthProvider>
            </TanstackProvider>
        </AppRouterCacheProvider>
    );
};
export default AppProviders;
