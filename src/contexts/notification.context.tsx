"use client";

import { createContext, ReactNode, useContext } from "react";
import { Toaster, toast } from "sonner";
import { NotificationContextProps } from "./type.notification";


const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider = ({ children }: {children: ReactNode}) => {

    const show = (message: string, type?: string) => {
        const toastType = type || "success";
        
        switch (toastType) {
            case "success":
                toast.success(message);
                break;
            case "info":
                toast.info(message);
                break;
            case "warning":
                toast.warning(message);
                break;
            case "error":
                toast.error(message);
                break;
            default:
                toast(message);
                break;
        }
    };


    return (
        <NotificationContext value={{ show }}>
            <Toaster richColors visibleToasts={5}/>
            {children}
        </NotificationContext>
    );
};

export const useNotification = (): NotificationContextProps => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};