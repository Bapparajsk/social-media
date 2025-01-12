import {
    IconBrandApple,
    IconDeviceMobile,
    IconDeviceLaptop,
} from "@tabler/icons-react";
import { Checkbox } from "@nextui-org/react";

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
    isSelect
}: {
    deviceName: string;
    loginDate: Date;
    onChecked: (checked: boolean, deviceName: string) => void;
    type: "mobile" | "laptop" | "apple";
    isSelect: boolean;
}) {
    const Icon = iconMap[type] || IconDeviceMobile;

    return (
        <div className="flex flex-row items-center justify-between pb-3">
            <div className="flex items-center gap-2">
                <Icon size={24} />
                <p>
                    {deviceName}
                    <span className="text-neutral-300 dark:text-neutral-600">
                        {" - "}{loginDate?.toISOString()}
                    </span>
                </p>
            </div>
            <Checkbox isSelected={isSelect} onValueChange={(e) => onChecked(e, deviceName)} color="danger" />
        </div>
    );
}
