import { useState, useEffect } from "react";

export function useUi() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [notificationMood, setNotificationMood] = useState<"on" | "off">("on");
    const [stickyHeader, setStickyHeader] = useState<"on" | "off">("on");

    useEffect(() => {
        // Check for stored theme in localStorage
        const storedTheme = localStorage.getItem("theme") as "light" | "dark";
        if (storedTheme) {
            setTheme(storedTheme);
            document.documentElement.classList.toggle("dark", storedTheme === "dark");
        }

        const storedNotificationMood = localStorage.getItem("notificationMood") as "on" | "off";
        if (storedNotificationMood) {
            setNotificationMood(storedNotificationMood);
        }

        const storedStickyHeader = localStorage.getItem("stickyHeader") as "on" | "off";
        if (storedStickyHeader) {
            setStickyHeader(storedStickyHeader);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    const toggleNotification = () => {
        const newNotificationMood = notificationMood === "on" ? "off" : "on";
        setNotificationMood(newNotificationMood);
        localStorage.setItem("notificationMood", newNotificationMood);
    };

    const toggleStickyHeader = () => {
        const newStickyHeader = stickyHeader === "on" ? "off" : "on";
        setStickyHeader(newStickyHeader);
        localStorage.setItem("stickyHeader", newStickyHeader);
    };

    return { theme, toggleTheme, notificationMood, toggleNotification, stickyHeader, toggleStickyHeader };
}
