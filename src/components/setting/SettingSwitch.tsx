import { Switch, Spinner } from "@nextui-org/react";
import { TablerIcon } from "@tabler/icons-react";
import { ReactNode } from "react";

type SettingSwitchProps = {
    Icon: TablerIcon;
    title: string | ReactNode;
    switchProps: {
        isSelected: boolean;
        color: "primary" | "success" | "warning" | "danger" | "secondary" | "default";
        size: "sm" | "md" | "lg";
        startContent?: React.ReactNode;
        endContent?: React.ReactNode;
        isLading?: boolean;
        onValueChange?: (isSelected: boolean) => void;
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
                {typeof title === "string" ? (<span>{title}</span>) : (title)}
            </div>
            {switchProps.isLading ?
                <Spinner size="sm" color="primary" /> :
                <Switch
                    isSelected={switchProps.isSelected}
                    color={switchProps.color}
                    size={switchProps.size}
                    startContent={switchProps.startContent}
                    endContent={switchProps.endContent}
                    onValueChange={switchProps.onValueChange}
                />
            }
        </div>
    );
}