import { useState, useEffect } from "react";

export function useNotification() {
    const [notificationMood, setNotificationMood] = useState<"on" | "off">("on");

    useEffect(() => {
        // Check for stored theme in localStorage
        const storedTheme = localStorage.getItem("notificationMood") as "on" | "off";
        if (storedTheme) {
            setNotificationMood(storedTheme);
        }
    }, []);

    const toggleNotification = () => {
        const newNotificationMood = notificationMood === "on" ? "off" : "on";
        setNotificationMood(newNotificationMood);
        localStorage.setItem("notificationMood", newNotificationMood);
    };

    return { notificationMood, toggleNotification };
}
