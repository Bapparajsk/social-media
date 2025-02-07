export interface NotificationContextProps {
    show: (message: string, type?: string) => void;
    loginSocket: (id: string) => void;
}