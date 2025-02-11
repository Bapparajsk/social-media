import { useEffect, useState } from "react";
import { ModalBody, ModalHeader, Button, Input } from "@nextui-org/react";
import {
    IconLockPassword,
    IconSignature,
    IconDots,
    IconLogout,
    IconSun,
    IconMoon,
    IconBellRinging,
    IconBell,
    IconBellOff,
    IconDevicesSearch,
} from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { redirect } from "next/navigation";

import Server from "@/lib/axios";
import SettingSwitch from "./SettingSwitch";
import SettingLabels from "./SettingLabels";
import { useUser } from "@/contexts/user.context";
import { useNotification } from "@/contexts/notification.context";
import ChangePasswordCard from "./changePasswordCard";
import TowFactorAuth from "./2FA";
import DevicesListModel from "./DevicesListModel";
import DevicesList from "./DevicesList";

interface Event {
    name: boolean;
    title: boolean;
}

interface EventType extends Event {
    pass: boolean;
}

interface InputType {
    name?: string;
    title?: string;
}

interface UserUpdatesType extends InputType {
    env: "name" | "title";
}

export default function SettingModel() {

    const [openDevicesLogs, setOpenDevicesLogs] = useState<boolean>(false);
    const [event, setEvent] = useState<EventType>({ name: false, title: false, pass: false });
    const [isChanged, setIsChanged] = useState<Event>({ name: false, title: false });
    const { user, setUser } = useUser();
    const { show: notification } = useNotification();

    if (user === null) {
        redirect("/login");
    }

    const [input, setInput] = useState<InputType>({ name: "", title: "" });

    const { mutate, isPending } = useMutation({
        mutationKey: ["setting", user?.name, user?.title],
        mutationFn: async ({ name, title, env }: UserUpdatesType) => {

            if (!user) throw new Error("User not found");
            if (!user.verifyEmail) throw new Error("User email not verified");

            const isValidChange = (env === "name" && isChanged.name && name) ||
                (env === "title" && isChanged.title && title);

            if (!isValidChange) throw new Error(`${env.charAt(0).toUpperCase() + env.slice(1)} not changed or missing`);

            const { data } = await Server.patch(`/api/user/update/${env}`, { name: env === "name" ? name : title });

            return data.message;
        },
        onSuccess: (message) => {
            notification(message as string || "User updated successfully", "success");
            if (!user) {
                redirect("/login");
            }

            setUser({ ...user, name: `@${input.name}`, title: input.title });
        },
        onError: (error) => {
            console.log(error);

            if (!isAxiosError(error)) {
                notification(error.message || "An error occurred", "error");
                return;
            }

            const { response } = error;
            notification(response?.data.message || "An error occurred", "error");
        },
    });

    useEffect(() => {
        setInput({ name: user.name.substring(1) || "", title: user.title || "" });
    }, [user]);

    return (
        <>
            <ModalHeader>
                Setting
            </ModalHeader>
            <ModalBody >
                <div className="w-full flex flex-col gap-3">
                    <div className="flex flex-col gap-2 border-b border-gray-200 dark:border-gray-700 pb-2 px-2">
                        <p>User</p>
                        <SettingLabels
                            Icon={IconSignature}
                            title="Change Name"
                            buttonProps={{ title: "Change", color: "default", size: "sm", variant: "faded", onPress: (is: boolean) => setEvent({ ...event, "name": is }), }}
                            eventTrigger={event.name}
                            EventComponent={
                                <div className="flex flex-col items-center justify-between gap-2">
                                    <Input
                                        type="text"
                                        startContent={"@"}
                                        placeholder={user?.name.substring(1) || "Enter new name"}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setInput({ ...input, "name": value });
                                            setIsChanged({ ...isChanged, "name": value !== user.name.substring(1) });
                                        }}
                                    />
                                    <Button
                                        type="button"
                                        fullWidth
                                        variant="faded"
                                        color="success"
                                        onPress={() => mutate({ name: input.name, env: "name" })}
                                        isDisabled={!isChanged.name}
                                        isLoading={isPending}
                                    >
                                        Save Changes
                                    </Button>
                                </div>
                            }
                        />
                        <SettingLabels
                            Icon={IconDots}
                            title="Change Title"
                            buttonProps={{ title: "Change", size: "sm", color: "default", variant: "faded", onPress: (is: boolean) => setEvent({ ...event, "title": is }), }}
                            eventTrigger={event.title}
                            EventComponent={
                                <div className="flex flex-col items-center justify-between gap-2">
                                    <Input
                                        type="text"
                                        placeholder={user?.title || "Enter new title"}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setInput({ ...input, "title": value });
                                            setIsChanged({ ...isChanged, "title": value !== user.title });
                                        }}
                                    />
                                    <Button
                                        type="button"
                                        fullWidth
                                        variant="faded"
                                        color="success"
                                        onPress={() => mutate({ title: input.title, env: "title" })}
                                        isDisabled={!isChanged.title}
                                        isLoading={isPending}
                                    >
                                        Save Changes
                                    </Button>
                                </div>
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-2 border-b border-gray-200 dark:border-gray-700 px-2">
                        <p>Security</p>
                        <SettingLabels
                            Icon={IconLockPassword}
                            title="Change Password"
                            buttonProps={{ title: "Change", size: "sm", variant: "faded", color: "danger", onPress: (is: boolean) => setEvent({ ...event, "pass": is }), }}
                            eventTrigger={event.pass}
                            EventComponent={<ChangePasswordCard user={user} setEvent={() => setEvent({ ...event, pass: false })} />}
                        />
                        <TowFactorAuth user={user} onSubmitted={(towFactorAuth: boolean) => {
                            setUser({ ...user, towFactorAuth: towFactorAuth });
                        }} />
                        <div className="border-t border-gray-200 dark:border-gray-800">
                            <div className="flex justify-between gap-2 py-3">
                                <div className="flex flex-row items-center gap-2">
                                    <IconDevicesSearch size={24} />
                                    <span>Devices</span>
                                </div>
                                <Button size="sm" variant="faded" color="warning" onPress={() => setOpenDevicesLogs(true)}>
                                    Vew logs
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 border-b border-gray-200 dark:border-gray-700 pb-2 px-2">
                        <p>Ui</p>
                        <SettingSwitch
                            Icon={IconSun}
                            title="Light Mode"
                            switchProps={{
                                isSelected: true,
                                color: "primary",
                                size: "md",
                                startContent: <IconMoon size={20} />,
                                endContent: <IconSun size={20} />,
                            }}
                        />
                        <SettingSwitch
                            Icon={IconBellRinging}
                            title="Notification"
                            switchProps={{
                                isSelected: true,
                                color: "warning",
                                size: "md",
                                startContent: <IconBellOff size={20} />,
                                endContent: <IconBell size={20} />,
                            }}
                        />
                    </div>
                    <div className="pb-2">
                        <Button size="sm" fullWidth variant="ghost" color="danger" className="py-4">
                            <span className="font-bold">Log Out</span>
                            <IconLogout size={24} />
                        </Button>
                    </div>
                </div>
            </ModalBody>
            <DevicesListModel isOpen={openDevicesLogs} onClose={() => setOpenDevicesLogs(false)} />
        </>
    );
}