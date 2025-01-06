"use client";

import {ReactNode, useState} from "react";
import {NextUIProvider} from '@nextui-org/react'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export function Providers({children}: { children: ReactNode }) {
    const [queryClient,] = useState(new QueryClient());

    return (
        <NextUIProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </NextUIProvider>
    );
}
