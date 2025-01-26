"use client";

import {Key} from '@react-types/shared';
import { Input } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { IconUserDown, IconUsers, IconUserShare } from "@tabler/icons-react";
import { useSearchParams, useRouter } from "next/navigation";

import { FriendList } from "@/components/friend";
import { MotionDiv } from "@/components/motion";

const envs = [
    "friends",
    "friend-request",
    "suggestions"
];

export default function Friend() {
    const params = useSearchParams();
    const env = params.get("env");
    const { push } = useRouter();

    if(env != null && !envs.includes(env)) {
        return (
            <div className="w-full h-[500px] flex items-center justify-center">
                <h3>invalid &apos;env&apos;</h3>
            </div>
        );
    }

    return (
        <div className={"w-full h-full px-2"}>
            <div className="w-full py-2 flex flex-col md:flex-row gap-2 items-center justify-between border-b border-gray-200 dark:border-gray-800">
                <div className="w-full flex items-center justify-between">
                    <MotionDiv
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="px-3"
                    >
                        <h3 className="font-bold text-xl">Friends</h3>
                    </MotionDiv>
                    <div className="flex justify-center flex-grow">
                        <Tabs
                            onSelectionChange={e => {                                
                                push(`/friend?env=${e}`);
                            }}
                            defaultSelectedKey={env === null ? "suggestions" : env as Key}
                            aria-label="Options"
                            color={env === "friends" ? "primary" : env === "friend-request" ? "warning" : "success"}
                            variant="underlined"
                        >
                            <Tab
                                key="friends"
                                title={
                                    <div className="flex items-center space-x-2">
                                        <IconUsers stroke={1.5} />
                                        <span className="hidden sm:block">Friends</span>
                                    </div>
                                }
                            />
                            <Tab
                                key="friend-request"
                                title={
                                    <div className="flex items-center space-x-2">
                                        <IconUserDown stroke={1.5} />
                                        <span className="hidden sm:block">Friend Request</span>
                                    </div>
                                }
                            />
                            <Tab
                                key="suggestions"
                                title={
                                    <div className="flex items-center space-x-2">
                                        <IconUserShare stroke={1.5} />
                                        <span className="hidden sm:block">Suggestions</span>
                                    </div>
                                }
                            />
                        </Tabs>
                    </div>
                </div>
                <div className="w-full flex-grow px-3">
                    <Input fullWidth placeholder="john" startContent={"@"} />
                </div>
            </div>
            <div className="w-full h-auto border-b border-gray-200 dark:border-gray-800">
                <FriendList env={env}/>
            </div>
        </div>
    );
}
