"use client";

import { MotionDiv } from "@/components/motion";
import { NotificationContainer } from "@/components/notification";

export default function Notification() {
    return (
        <div className={"w-full px-3 pb-5"}>
            <div className="w-full py-2">
                <MotionDiv
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-start w-full h-full"
                >
                    <h1 className="text-xl font-bold">Notification</h1>
                </MotionDiv>
            </div>
            <NotificationContainer />
        </div>
    );
}
