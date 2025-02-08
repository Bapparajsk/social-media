"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { NotificationContextProps, PushNotificationType } from "./type.notification";
import { getSocket } from "../lib/socket";
import Image from "next/image";

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider = ({ children }: {children: ReactNode}) => {

    const [socket,] = useState(getSocket());

    useEffect(() => {
        socket.on("notification", (data: PushNotificationType) => {
            toast( 
                <div className="flex items-center space-x-2">
                    <Image src={"/newbg.jpeg"} className="w-12 h-12 rounded-full " alt={data.title} width={50} height={50} />
                    <h3>{data.title}</h3>
                </div>, 
            );
        });

        return () => {
            socket.off("notification");
        };
    },[socket]);

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