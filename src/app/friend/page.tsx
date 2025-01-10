"use client";

import { useState } from "react";
import { Input } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { IconUserDown, IconUsers, IconUserShare } from "@tabler/icons-react";

import { FriendList } from "@/components/friend";

export default function Friend() {
    const [selectedTab, setSelectedTab] = useState<string>("suggestions");

    return (
        <div className={"w-full h-full px-2"}>
            <div className="w-full py-2 flex flex-col md:flex-row gap-2 items-center justify-between border-b border-gray-200 dark:border-gray-800">
                <div className="w-full flex items-center justify-between">
                    <div className="px-3">
                        <h3 className="font-bold text-xl">Friends</h3>
                    </div>
                    <div className="flex justify-center flex-grow">
                        <Tabs
                            onSelectionChange={e => {
                                setSelectedTab(e as string);
                            }}
                            defaultSelectedKey={"suggestions"}
                            aria-label="Options"
                            color="success"
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
                <FriendList />
            </div>
        </div>
    );
}
