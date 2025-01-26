"use client";

import { ReactNode } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Image } from "@nextui-org/react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { typeColor } from "./typeColor";

export default function Notification({
    name,
    title,
    imageSrc,
    description,
    link,
    linkName,
    type,
} : {
    name?: string;
    title?: string;
    imageSrc?: string;
    description?: ReactNode | string | undefined;
    link?: string;
    linkName?: string;
    type?: "post" | "friend-request" | "comment" | "like" | "share" | "friend-reject" | "message" | "notification" | undefined;
}) {

    return (
        <Card className={cn("mb-3 border-b", typeColor[type || "notification"])}>
            <CardHeader className="flex gap-3">
                <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src={imageSrc || "https://avatars.githubusercontent.com/u/86160567?s=200&v=4"}
                    width={40}
                />
                <div className="flex flex-col">
                    <p className="text-md">{name || "New Notification"}</p>
                    <p className="text-small text-default-500">{title || "upload a new video for user friend"}</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                {description || "This is a new notification for you. Please check it out."}
            </CardBody>
            <Divider />
            {link && <CardFooter>
                <Link className="text-blue-500" href={link || ""} target={link && link.startsWith("http") ? "_blank" : ""}>
                    {linkName || "View"}
                </Link>
            </CardFooter>}
        </Card>
    );
}
