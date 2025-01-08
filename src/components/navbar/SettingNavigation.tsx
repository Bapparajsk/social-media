import { IconSettings, IconSearch } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SettingNavigation = () => {

    const pathName = usePathname();

    return (
        <div className={"flex gap-2"}>
            <Button variant={pathName.startsWith("/search") ? "shadow" : "flat"}>
                <Link href={"/search?type=post"} className={"flex gap-2 lg:w-52 justify-between items-end"}>
                    <IconSearch stroke={1.5}/>
                    <span className="flex-grow h-[1px] rounded-md bottom-0 underline bg-white hidden lg:block"/>
                    <span className="text-medium">Search</span>
                </Link>
            </Button>
            <Button variant={pathName.startsWith("/setting") ? "shadow" : "flat"}>
                <Link href={"/setting"} className={"flex gap-2"}>
                    <IconSettings stroke={1.5}/>
                    <span className="text-medium">Setting</span>
                </Link>
            </Button>
        </div>
    );
};
