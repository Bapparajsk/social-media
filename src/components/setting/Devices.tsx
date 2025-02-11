import {
    IconBrandApple,
    IconDeviceMobile,
    IconDeviceLaptop,
} from "@tabler/icons-react";
import { Button } from "@nextui-org/button";

const iconMap = {
    mobile: IconDeviceMobile,
    laptop: IconDeviceLaptop,
    apple: IconBrandApple,
};

export default function Devices({
    deviceName,
    loginDate,
    onChecked,
    type,
    isSelect,
    deviceId,
}: {
    deviceName: string;
    loginDate: Date;
    onChecked: (id: string) => void;
    type: "mobile" | "laptop" | "apple";
    isSelect?: boolean;
    deviceId: string;
}) {
    const Icon = iconMap[type] || IconDeviceMobile;

    return (
        <Button fullWidth onPress={() => onChecked(deviceId)} variant={"faded"} color={isSelect ? "danger" : "default"} className="justify-between">
            <div className="flex items-center gap-2">
                <Icon size={24} />
                <p>
                    <span className="font-bold">{deviceName}</span>
                    <span>
                        {" - "}{new Date(loginDate).toDateString()}
                    </span>
                </p>
            </div>
        </Button>
    );
}
