"use client";

import {ReactNode, useState} from "react";
import {NextUIProvider} from '@nextui-org/react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AuthProvider from "./authProvider";
import { UserProvider } from "@/contexts/user.context";
import { ProfileProvider } from "@/contexts/profile.context";
import { NotificationProvider } from "@/contexts/notification.context";
import { useTheme } from "@/hooks/useTheme";
import { useNotification } from "@/hooks/useNotification";

export function Providers({children}: { children: ReactNode }) {
    const [queryClient,] = useState(new QueryClient());
    useTheme();
    useNotification();

    return (
        <NextUIProvider>
            <QueryClientProvider client={queryClient}>
                    <UserProvider>
                        <NotificationProvider>
                            <ProfileProvider>
                                <AuthProvider>
                                    {children}
                                </AuthProvider>
                            </ProfileProvider>
                        </NotificationProvider>
                    </UserProvider>
            </QueryClientProvider>
        </NextUIProvider>
    );
}
