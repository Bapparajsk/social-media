import { Switch } from "@nextui-org/switch";
import { TablerIcon } from "@tabler/icons-react";

type SettingSwitchProps = {
    Icon: TablerIcon;
    title: string;
    switchProps: {
        defaultSelected: boolean;
        color: "primary" | "success" | "warning" | "danger" | "default";
        size: "sm" | "md" | "lg";
        startContent: React.ReactNode;
        endContent: React.ReactNode;
    }
}

export default function SettingSwitch({
    Icon,
    title,
    switchProps,
}: SettingSwitchProps) {
    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
                <Icon size={24} />
                <span>{title}</span>
            </div>
            <Switch
                defaultSelected={switchProps.defaultSelected}
                color={switchProps.color}
                size={switchProps.size}
                startContent={switchProps.startContent}
                endContent={switchProps.endContent}
            />
        </div>
    );
}