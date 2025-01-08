import { useState } from "react";
import { ModalHeader, ModalBody } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { IconLocationShare } from "@tabler/icons-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

export default function Share() {
    return (
        <>
            <ModalHeader className="flex flex-col gap-1">Share With Your Friends</ModalHeader>
            <ModalBody>
                <div className="w-full h-[550px] overflow-y-auto px-3 py-2">
                    <Shareuser />
                    <Shareuser />
                    <Shareuser />
                    <Shareuser />
                    <Shareuser isActivated/>
                    <Shareuser />
                    <Shareuser />
                    <Shareuser />
                    <Shareuser />
                    <Shareuser />
                    <Shareuser />
                    <Shareuser />
                    <Shareuser />
                    <Shareuser />
                    <Shareuser />
                    <Shareuser />
                    <Shareuser />
                    <Shareuser />
                    <Shareuser />
                    <Shareuser />
                    <Shareuser />
                    <Shareuser />
                    <Shareuser />
                    <Shareuser />
                    <Shareuser />
                    <Shareuser />
                    <Shareuser />
                    <Shareuser />
                    <Shareuser />
                    <Shareuser />
                </div>

            </ModalBody>
        </>
    );
}

const Shareuser = ({
    profileImage,
    userName,
    userDesignation,
    isActivated
} : {
    profileImage?: string | undefined,
    userName?: string | undefined,
    userDesignation?: string | undefined,
    isActivated?: boolean | undefined
}) => {

    const [isSended, setIsSended] = useState(false);

    const handleShare = () => {
        setIsSended(true);
        // todo handle api coll to share
    };

    return (
        <div className="w-full h-auto py-2 border-b-[1px] border-gray-200 dark:border-gray-700">
            <div className="w-full h-auto flex items-center justify-between gap-2">
                <div className="w-auto h-auto flex items-center gap-2">
                    <div className="w-10 h-10">
                        <Image
                            width={100}
                            height={100}
                            src={profileImage || "/newbg.jpeg"}
                            alt="John Doe"
                            className={cn(
                                "w-full h-full object-cover rounded-full border-[2px]",
                                isActivated ? "border-green-400" : "border-gray-200 dark:border-gray-700"
                            )}
                        />
                    </div>
                    <div className="w-auto h-auto flex flex-col">
                        <p className="text-sm font-bold">{userName || "John Doe"}</p>
                        <p className="text-xs text-gray-400">{userDesignation || "Software Engineer"}</p>
                    </div>
                </div>
                <div className="w-auto h-auto flex items-center gap-2">
                    <Button
                        onPress={handleShare}
                        isIconOnly
                        variant={isSended ? "shadow" : "ghost"}
                        disabled={isSended}
                        color={isSended ? "success" : "default"}
                    >
                        <IconLocationShare stroke={1.5} />
                    </Button>
                </div>
            </div>
        </div>
    );
};