import { Button } from "@nextui-org/button";
import { TablerIcon } from "@tabler/icons-react";
import React from "react";

import { MotionDiv, AnimatePresence } from "@/components/motion";

type SettingLabelsProps = {
    Icon: TablerIcon;
    title: string;
    buttonProps: {
        title: string;
        size: "sm" | "md" | "lg";
        variant: "flat" | "faded" | "shadow";
        color?: "primary" | "success" | "warning" | "danger" | "default";
        onPress: (is: boolean) => void
    }
    event: boolean;
    EventComponent?: React.ReactNode;
    onSubmit?: () => void;
}

export default function SettingLabels({
    Icon,
    title,
    buttonProps,
    event,
    EventComponent,
    onSubmit
} : SettingLabelsProps) {



    return (
        <div className="flex flex-col items-center gap-2">
            <div className="w-full flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-2">
                    <Icon size={24} />
                    <span>{title}</span>
                </div>
                <Button
                    size={buttonProps.size}
                    variant={event ? "shadow" : buttonProps.variant}
                    onPress={() => buttonProps.onPress(!event)}
                    color={buttonProps.color || "primary"}
                >
                    Change
                </Button>
            </div>
            <AnimatePresence>
                {event && (
                    <form 
                        className="w-full"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (onSubmit) onSubmit();
                        }}
                    >
                        <MotionDiv
                            initial={{ height: 0 }}
                            animate={{ height: 'auto', overflow: 'hidden' }}
                            exit={{ height: 0, }}
                            transition={{
                                duration: 0.2,
                                ease: "linear",
                            }}
                        >
                            {EventComponent}
                        </MotionDiv>
                    </form>
                )}
            </AnimatePresence>
        </div>
    );
}