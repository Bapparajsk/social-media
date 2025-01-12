import { useState } from "react";
import { ModalBody, ModalHeader, Accordion, AccordionItem, Button, Input, Checkbox } from "@nextui-org/react";
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
    IconDevices,
    IconDevicesOff,
    IconDevicesPlus,
    IconDevicesSearch,
} from "@tabler/icons-react";
import DevicesList from "./DevicesList";
import SettingSwitch from "./SettingSwitch";
import SettingLabels from "./SettingLabels";

export default function SettingModel() {

    const [event, setEvent] = useState<{
        name: boolean;
        title: boolean;
        pass: boolean;
    }>({
        name: false,
        title: false,
        pass: false,
    });

    return (
        <>
            <ModalHeader>
                Setting
            </ModalHeader>
            <ModalBody >
                <div className="w-full h-auto flex flex-col gap-3">
                    <div className="flex flex-col gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
                        <p>User</p>
                        <SettingLabels
                            Icon={IconSignature}
                            title="Change Name"
                            buttonProps={{ title: "Change", color: "default", size: "sm", variant: "faded", onPress: (is:boolean) => setEvent({ ...event, "name": is }), }}
                            event={event.name}
                            EventComponent={
                                <div className="flex flex-col items-center justify-between gap-2">
                                    <Input 
                                        type="text" 
                                    />
                                    <Button type="submit" fullWidth variant="faded" color="success">Save</Button>
                                </div>
                            }
                        />
                        <SettingLabels
                            Icon={IconDots}
                            title="Change Title"
                            buttonProps={{ title: "Change", size: "sm", color: "default", variant: "faded", onPress: (is:boolean) => setEvent({ ...event, "title": is }), }}
                            event={event.title}
                            EventComponent={
                                <div className="flex flex-col items-center justify-between gap-2">
                                    <Input 
                                        type="text" 
                                    />
                                    <Button type="submit" fullWidth variant="faded" color="success">Save</Button>
                                </div>
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-2 border-b border-gray-200 dark:border-gray-700">
                        <p>Security</p>
                        <SettingLabels
                            Icon={IconLockPassword}
                            title="Change Password"
                            buttonProps={{ title: "Change", size: "sm", variant: "faded", color: "danger", onPress: (is:boolean) => setEvent({ ...event, "pass": is }), }}
                            event={event.pass}
                            EventComponent={
                                <div className="flex flex-col items-center justify-between gap-2">
                                    <Input type="password" placeholder="Enter old password"/>
                                    <Input type="password" placeholder="New password"/>
                                    <Input type="password" placeholder="Confirm new password"/>
                                    <div className="w-full flex flex-row items-center justify-between gap-2">
                                        <Checkbox color="primary" size="md">
                                            Show Password
                                        </Checkbox>
                                    </div>
                                    <Button fullWidth variant="shadow" color="primary">Change Password</Button>
                                </div>
                            }
                        />
                        <SettingSwitch
                            Icon={IconDevices}
                            title="Another Device Login"
                            switchProps={{
                                defaultSelected: true,
                                color: "danger",
                                size: "md",
                                startContent: <IconDevicesOff size={20} />,
                                endContent: <IconDevicesPlus size={20} />,
                            }}
                        />
                        <div className="max-h-[300px] overflow-y-scroll border-t border-gray-200 dark:border-gray-800">
                            <Accordion>
                                <AccordionItem
                                    key="1" aria-label="Devices"
                                    title={
                                        <div className="flex flex-row items-center gap-2">
                                            <IconDevicesSearch size={24} />
                                            <span>Devices</span>
                                        </div>
                                    }
                                >
                                    <DevicesList />
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
                        <p>Ui</p>
                        <SettingSwitch
                            Icon={IconSun}
                            title="Light Mode"
                            switchProps={{
                                defaultSelected: true,
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
                                defaultSelected: true,
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
        </>
    );
}