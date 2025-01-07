"use client";

import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import {TablerIcon, IconHome, IconUsers, IconBrandLine, IconMessage, IconDotsVertical, IconSearch} from "@tabler/icons-react";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {MotionDiv} from "@/components/motion";

type NavigationType = {
    title: string;
    href: string;
    icon: TablerIcon ;
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
        href: "/chat",
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
        icon: IconDotsVertical
    },
];


export const NavNavigation = () => {
    const ref = useRef<HTMLDivElement>(null);
    const activeRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const [barStyle, setBarStyle] = useState({ left: 0, width: 0 });

    useEffect(() => {
        if (activeRef.current && ref.current && (pathname === "/" || pathname.startsWith("/friend") || pathname.startsWith("/chat") || pathname.startsWith("/notification"))) {
            const target = activeRef.current.getBoundingClientRect();
            const container = ref.current.getBoundingClientRect();
            if (container) {
                const left = target.left - container.left; // Relative left position
                const width = target.width;
                setBarStyle({left, width});
            }
        } else {
            setBarStyle(prev => ({...prev, width: 0}));
        }
    }, [pathname]);

    return (
        <div className={"w-auto"} ref={ref}>
            <div  className={"w-auto flex gap-4 md:gap-10 lg:gap-14 relative"}>
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
                        <Link href={item.href} className={cn(
                            "flex cursor-pointer items-center flex-col sm:flex-row gap-1 sm:gap-2 lg:gap-3",
                            pathname === "/" && item.href === "/" ? "text-white" : item.href !== '/' && pathname.includes(item.href) ? "text-white" : "text-gray-400",
                        )}>
                            {item.icon && <item.icon className={"w-5 lg:w-7"}/>}
                            <span>{item.title}</span>
                        </Link>
                    </div>
                ))}
                <MotionDiv
                    initial={{
                        width: 0,
                        backgroundColor: "white",
                    }}
                    animate={{
                        left: barStyle.left,
                        width: barStyle.width,
                    }}
                    transition={{
                        left: { type: "spring", stiffness: 700, damping: 30 }, // Position animation
                        width: { type: "spring", stiffness: 700, damping: 30 }, // Width animation
                    }}
                    className="absolute h-[2px] bg-white -bottom-3 rounded-md hidden lg:block"
                />
            </div>
        </div>
    );
};
