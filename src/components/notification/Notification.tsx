"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { PushNotificationType } from "@/contexts/type.notification";
import { refactorDate } from "@/lib/time";

export default function Notification({
    name,
    title,
    imageSrc,
    date
}: PushNotificationType) {

    return (
        <figure
            className={cn(
                "relative mx-auto h-auto min-h-fit w-full max-w-[400px] cursor-pointer rounded-2xl p-3",
                // animation styles
                "transition-all duration-200 ease-in-out hover:scale-[103%]",
                // light styles
                "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                // dark styles
                "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
            )}
        >
            <div className="flex flex-row items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-2xl overflow-hidden" >
                    <Image
                        width={100}
                        height={100}
                        alt={imageSrc?.alt || "Profile Picture"}
                        className={"rounded-full w-full h-full object-cover"}
                        src={imageSrc?.url || "/newbg.jpeg"}
                    />
                </div>
                <div className="flex flex-col overflow-hidden">
                    <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
                        <span className="text-sm sm:text-lg">{name}</span>
                        <span className="mx-1">·</span>
                        <span className="text-xs text-gray-500">{refactorDate(date)}</span>
                    </figcaption>
                    <p className="text-sm font-normal dark:text-white/60">
                        {title}
                    </p>
                </div>

            </div>
        </figure>
    );
}
