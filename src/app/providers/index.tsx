"use client";
import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { TanstackProvider } from "./tanstack-provider";

interface IAppProviders {
    children: React.ReactNode;
}
const AppProviders: React.FC<IAppProviders> = ({ children }) => {
    return (
        <AppRouterCacheProvider>
            <TanstackProvider>{children}</TanstackProvider>
        </AppRouterCacheProvider>
    );
};
export default AppProviders;
