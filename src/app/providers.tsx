"use client";

import {ReactNode, useState} from "react";
import {NextUIProvider} from '@nextui-org/react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AuthProvider from "./authProvider";
import { UserProvider } from "@/contexts/user.context";
import { ProfileProvider } from "@/contexts/profile.context";

export function Providers({children}: { children: ReactNode }) {
    const [queryClient,] = useState(new QueryClient());

    return (
        <NextUIProvider>
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    <ProfileProvider>
                        <AuthProvider>
                            {children}
                        </AuthProvider>
                    </ProfileProvider>
                </UserProvider>
            </QueryClientProvider>
        </NextUIProvider>
    );
}
