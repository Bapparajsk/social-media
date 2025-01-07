"use client";

import { Navbar, NavbarContent } from "@nextui-org/navbar";
import { usePathname } from "next/navigation";
import {NavNavigation} from "@/components/navbar/NavNavigation";
import {SettingNavigation} from "@/components/navbar/SettingNavigation";
import { UserData } from "./UserData";

const authPaths = ["/login", "/register"];

export const NavbarComponent = () => {
    const pathname = usePathname();
    if (authPaths.includes(pathname)) {
        return null;
    }

    return (
        <>
            <Navbar shouldHideOnScroll className={"border-b-[1px] border-gray-600 justify-center "} classNames={{
                wrapper: "justify-center lg:justify-between",
            }}>
                <NavbarContent justify="center" className="dfjhg">
                    <NavNavigation/>
                </NavbarContent>
                <NavbarContent justify="end" className="hidden lg:flex">
                    <SettingNavigation/>
                </NavbarContent>
            </Navbar>
            <UserData/>
        </>
    );
};
