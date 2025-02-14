"use client";

import { useEffect, useRef, useState } from "react";
import { TablerIcon, IconHome, IconUsers, IconBrandLine, IconMessage, IconSettings, IconSearch } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import {
    Modal,
    ModalContent,
    useDisclosure
} from "@nextui-org/modal";

import { MotionDiv } from "@/components/motion";
import useScreenSize from "@/hooks/useScreenSize";
import { ChatContainerModel } from "@/components/chat";
import { SearchModel } from "@/components/search";
import { SettingModel } from "@/components/setting";

import { cn } from "@/lib/utils";

type NavigationType = {
    title: string;
    href: string;
    icon: TablerIcon;
}

const navigation: NavigationType[] = [
    {
        title: "Home",
        href: "/",
        icon: IconHome
    },
    {
        title: "Friend",
        href: "/friend",
        icon: IconUsers
    },
    {
        title: "Chat",
        href: "/chatlist",
        icon: IconBrandLine
    },
    {
        title: "Notification",
        href: "/notification",
        icon: IconMessage
    },
    {
        title: "Search",
        href: "/search",
        icon: IconSearch
    },
    {
        title: "Setting",
        href: "/setting",
        icon: IconSettings
    },
];


export const NavNavigation = () => {
    const [barStyle, setBarStyle] = useState({ left: 0, width: 0 });
    const [modalState, setModalState] = useState<"chat" | "search" | "setting">("chat");
    const ref = useRef<HTMLDivElement>(null);
    const activeRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    
    const {isOpen, onOpen, onClose} = useDisclosure();
    const { push } = useRouter();
    const { width } = useScreenSize();

    useEffect(() => {
        if (activeRef.current && 
            ref.current && 
            ((pathname === "/" ||
                pathname.startsWith("/friend") || 
                pathname.startsWith("/chatlist") || 
                pathname.startsWith("/notification")
            ))
        ) {
            const target = activeRef.current.getBoundingClientRect();
            const container = ref.current.getBoundingClientRect();
            if (container) {
                const left = target.left - container.left; // Relative left position
                const width = target.width;
                setBarStyle({ left, width });
            }
        } else {
            setBarStyle(prev => ({ ...prev, width: 0 }));
        }
    }, [pathname, width]);

    const handleNavigation = (href: string) => {

        if (href === "/search") {
            setModalState("search");
            onOpen();
            return;
        }
        if (href === "/setting") {
            setModalState("setting");
            onOpen();
            return;
        }

        if (width && width > 1024 && href === "/chatlist") {
            setModalState("chat");
            onOpen();
            return;
        }

        push(href);
    };

    return (
        <>
            <div className={"w-auto"} ref={ref}>
                <div className={"w-auto flex gap-10 sm:gap-7 md:gap-10 lg:gap-14 relative"}>
                    {navigation.map((item, index) => (
                        <div
                            ref={re => {
                                if (pathname === "/" && item.href === "/") {
                                    activeRef.current = re;
                                } else if (pathname.startsWith(item.href)) {
                                    activeRef.current = re;
                                }
                            }}
                            key={index}
                            className={cn(
                                "text-sm lg:text-medium",
                                (item.title === "Search" || item.title === "Setting") && "block lg:hidden",
                            )}
                        >
                            <div onClick={() => handleNavigation(item.href)} className={cn(
                                "flex cursor-pointer items-center gap-1 sm:gap-2 lg:gap-3",
                                pathname === "/" && item.href === "/" ?
                                    "text-neutral-900 dark:text-white" : item.href !== '/' &&
                                        pathname.includes(item.href) ? "dark:text-white text-neutral-800" : "dark:text-gray-400 text-neutral-400",
                            )}>
                                {item.icon && <item.icon className={"w-5 lg:w-7"} />}
                                <span className="hidden sm:block">{item.title}</span>
                            </div>
                        </div>
                    ))}
                    <MotionDiv
                        initial={{
                            width: 0,
                            // backgroundColor: "white",
                        }}
                        animate={{
                            left: barStyle.left,
                            width: barStyle.width,
                        }}
                        transition={{
                            left: { type: "spring", stiffness: 700, damping: 30 }, // Position animation
                            width: { type: "spring", stiffness: 700, damping: 30 }, // Width animation
                        }}
                        className="absolute h-[2px] bg-neutral-900 dark:bg-white -bottom-3 rounded-md hidden sm:block"
                    />
                </div>
            </div>
            <Modal 
                backdrop="blur" 
                isOpen={isOpen} 
                size={modalState === "setting" ? "xl" : width && width < 1024 ? "full" : "5xl"} 
                onClose={onClose}
                isDismissable={false}
            >
                <ModalContent>
                    {() => (
                        modalState === "chat" ? <ChatContainerModel/> :
                        modalState === "search" ? <SearchModel/> : <SettingModel/>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
