"use client";

import { createContext, ReactNode, useContext, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { NotificationContextProps } from "./type.notification";
import { getSocket } from "../lib/socket";


const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider = ({ children }: {children: ReactNode}) => {

    const socket = getSocket();

    useEffect(() => {
        socket.on("notification", (data: any) => {
            console.log(data);
        });
    },[]);

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

    const loginSocket = (id: string) => {
        console.log("loginSocket", id);
        
        socket.emit("login", id);
    };

    return (
        <NotificationContext value={{ show, loginSocket }}>
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