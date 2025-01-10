"use client";

import ChatUserItem from "@/components/chat/ChatUserItem";

export default function Chat() {
    return (
        <div className={"max-w-xl h-auto px-2 mx-auto"}>
            <div className="w-full">
                <div
                    className="w-full overflow-y-auto mt-3
                        [&::-webkit-scrollbar]:w-1
                        [&::-webkit-scrollbar-track]:rounded-full
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-gray-300
                        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
                        "
                >
                    <ChatUserItem lastMessageTime={new Date()} lastMessage={"wwwwwwwwwwwwwwwwwwwwwww"} />
                    <ChatUserItem isActive />
                    <ChatUserItem />
                    <ChatUserItem />
                    <ChatUserItem />
                    <ChatUserItem lastMessageTime={new Date()} lastMessage={"wwwwwwwwwwwwwwwwwwwwwwwwww"} />
                    <ChatUserItem isActive />
                    <ChatUserItem />
                    <ChatUserItem />
                    <ChatUserItem />
                    <ChatUserItem lastMessageTime={new Date()} lastMessage={"wwwwwwwwwwwwwwwwwwwwwww"} />
                    <ChatUserItem isActive />
                    <ChatUserItem />
                    <ChatUserItem />
                    <ChatUserItem />
                    <ChatUserItem lastMessageTime={new Date()} lastMessage={"wwwwwwwwwwwwwwwwwwwwwww"} />
                    <ChatUserItem isActive />
                    <ChatUserItem />
                    <ChatUserItem />
                    <ChatUserItem />
                    <ChatUserItem lastMessageTime={new Date()} lastMessage={"wwwwwwwwwwwwwwwwwwwwwww"} />
                    <ChatUserItem isActive />
                    <ChatUserItem />
                    <ChatUserItem />
                    <ChatUserItem />
                </div>
            </div>
        </div>
    );
}
