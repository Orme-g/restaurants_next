"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

interface ITanstackProvider {
    children: React.ReactNode;
}
export const TanstackProvider: React.FC<ITanstackProvider> = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient());
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
