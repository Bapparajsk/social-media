import { useState } from "react";
import { Checkbox, Button, Tooltip } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

import Server from "@/lib/axios";
import Devices from "./Devices";
import { IconBrandApple, IconDeviceLaptop, IconDeviceMobile, IconSparkles } from "@tabler/icons-react";

interface LoginDevice {
    deviceId: string;
    deviceName: string;
    os: string;
    lastLogin: Date;
    isPrimary: boolean;
    isSelect: boolean;
    type: "mobile" | "laptop" | "apple";
}

interface DevicesListType {
    [key: string]: LoginDevice;
}

const iconMap = {
    mobile: IconDeviceMobile,
    laptop: IconDeviceLaptop,
    apple: IconBrandApple,
};

export default function DevicesList() {

    const [devices, setDevices] = useState<DevicesListType>();
    const [primaryDevice, setPrimaryDevice] = useState<LoginDevice | null>(null);

    const { isPending } = useQuery({
        queryKey: ["loginDevices"],
        queryFn: async () => {
            const { data } = await Server.get("/api/user/login-devices");

            // If devices is an object, update each device to include isSelect: false
            const updatedDevices = Object.keys(data.devices).reduce((acc: DevicesListType, key: string) => {
                acc[key] = { ...data.devices[key], isSelect: false };
                return acc;
            }, {});
            
            console.log(updatedDevices);
            
            // Find the primary device (if any)
            const primaryDevice = Object.values(updatedDevices).find(device => device.isPrimary) || null;
            
            setPrimaryDevice(primaryDevice);
            setDevices(updatedDevices);

            return data.devices;
        }
    });

    const selectHandlerAll = (value: boolean) => {
        console.log(value);
        
        if (!devices) return;
        Object.keys(devices).forEach((key) => {
            devices[key].isSelect = value;
        });
        setDevices({ ...devices });
    };

    const PrimaryDeviceIcon = primaryDevice && iconMap[primaryDevice.type] || IconDeviceMobile;

    return (
        <div className="w-full flex flex-col px-2 py-5">
            <div className="flex items-center justify-between mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">
                <p className="text-lg">
                    Devices
                </p>
                <Checkbox isSelected={devices && Object.keys(devices).every(key => devices[key].isSelect)} onValueChange={selectHandlerAll} color="primary" >
                    <span className="text-medium">Select All</span>
                </Checkbox>
            </div>
            {primaryDevice && <div className="px-2 pb-2 mb-2 border-b border-gray-200 dark:border-gray-700">
                <Tooltip
                    delay={0}
                    content="Primary Device"
                    color="primary"
                    placement="top"
                >
                    <Button fullWidth variant={"shadow"} color={"primary"} className="justify-between" endContent={
                        <div className={`flex items-center justify-center w-6 h-6`}>
                            <IconSparkles size={20} stroke={2.5} />
                        </div>
                    }>
                        <div className="flex items-center gap-2">
                            <PrimaryDeviceIcon size={24}/>
                            <p className="font-bold">
                                <span>{primaryDevice.os}</span>
                                <span>
                                    {" - "}{new Date(primaryDevice.lastLogin).toDateString()}
                                </span>
                            </p>
                        </div>
                    </Button>
                </Tooltip>
            </div>}
            <div className="flex flex-col gap-2 h-auto max-h-[350px] px-2 overflow-y-auto scrollbar-hide transition-all duration-1000">
                {isPending && <p>Loading...</p>}
                {devices && Object.keys(devices).map((key) => {
                    const device = devices[key];
                    return (
                        <div key={key}>
                            <Devices
                                key={key}
                                deviceId={device.deviceId}
                                deviceName={device.os}
                                loginDate={device.lastLogin}
                                onChecked={(id) => {
                                    devices[id].isSelect = !devices[id].isSelect;
                                    setDevices({ ...devices });
                                }}
                                type={"mobile"}
                                isSelect={device.isSelect}
                            />
                        </div>
                    );
                })}
            </div>
            <div className="mt-3">
                <Button fullWidth color={"danger"} variant="shadow" isDisabled>Remove Selected</Button>
            </div>
        </div>
    );
}
