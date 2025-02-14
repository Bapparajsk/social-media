export interface NotificationContextProps {
    show: (message: string, type?: string) => void;
    loginSocket: (id: string) => void;
    notification: PushNotificationType[];
    setNotifications: (notification: PushNotificationType[]) => void;
}

export interface PushNotificationType {
    name: string;
    title: string;
    imageSrc?: {
        env: "local" | "cloudinary";
        url: string | null;
        alt: string;
    };
    description?: string | undefined;
    link?: string;
    linkName?: string;
    type?: "name" | "title" | "message" | "success" |
        "post" | "comment" | "like" | "unlike" | "share" |
        "friend-accept" | "friend-request"  | "friend-reject" |
        "notification.ts" | "password"| "email"| "primaryDevice" |
        "login" | "register" | "logout" | undefined;
    date: Date;
    isRead?: boolean;
}