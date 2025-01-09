import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ChatUserItem({
    id,
    userName,
    profileImage,
    lastMessage,
    onClick,
    isActive,
    lastMessageTime,
    className,
}: {
    id?: string | undefined | null,
    userName?: string | undefined | null,
    profileImage?: string | undefined | null,
    lastMessage?: string | undefined | null,
    onClick?: (id: string) => void,
    isActive?: boolean | undefined | null,
    lastMessageTime?: Date | undefined | null
    className?: string | undefined
    isFullLastMessage?: boolean | undefined
}) {
    const formatTime = (date: Date | undefined | null): string | null => {
        if (!date) return null;
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div 
            onClick={() => { if (onClick && id) onClick(id); }} 
            className={cn("w-full flex justify-between items-center cursor-pointer hover:bg-gray-800 p-2 border-b border-gray-200 dark:border-gray-700", className)}
        >
            
            <div className="h-14 w-14">
                <Image
                    src={profileImage || "/profile.jpg"}
                    width={100}
                    height={100}
                    alt={userName || "user"}
                    className={cn("w-full h-full object-cover rounded-full cursor-pointer",
                        isActive && "ring-2 ring-green-400"
                    )}
                />
            </div>
            <div className="flex flex-col flex-grow ml-2">
                <div className="flex justify-between">
                    <p className="text-white">
                        {userName || "Bapparaj"}
                    </p>
                    <p className="font-bold text-sm text-green-500">
                        {formatTime(lastMessageTime) || "-"}
                    </p>
                </div>
                <p className="text-gray-400 text-sm">
                    {lastMessage ? lastMessage.length > 23 ? lastMessage.slice(0, 23) + "..." : lastMessage : "Share your message Encrypt to Encrypt"}
                </p>
            </div>
        </div>
    );
}
