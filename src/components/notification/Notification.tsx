"use client";

import { Card, CardHeader, CardBody, CardFooter, Divider, Image } from "@nextui-org/react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { getBorderColor } from "./typeColor";
import { PushNotificationType } from "@/contexts/type.notification";

export default function Notification({
    name,
    title,
    // imageSrc,
    description,
    link,
    linkName,
    type,
    isRead,
} : PushNotificationType) {

    return (
        <Card className={cn("mb-3", isRead ? "border-b" : "border", getBorderColor(type || "notification"))}>
            <CardHeader className="flex gap-3">
                <Image
                    height={40}
                    width={40}
                    radius="sm"
                    src={"https://avatars.githubusercontent.com/u/86160567?s=200&v=4"}
                    alt={"User Image"}
                    // src={imageSrc?.url || "https://avatars.githubusercontent.com/u/86160567?s=200&v=4"}
                    // alt={imageSrc?.alt || "User Image"}
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
