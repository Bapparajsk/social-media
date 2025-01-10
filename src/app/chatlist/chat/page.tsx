"use client";

import Send from "@/components/chat/Send";
import { Button, Input } from "@nextui-org/react";
import { IconDotsVertical, IconSend2, IconArrowLeft } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ChatContainer() {

    const {back} = useRouter();

    return (
        <div className="w-full h-[100vh] flex flex-col pb-2">
            <div className="w-full h-20 bg-[#141414] flex items-center justify-between rounded-lg">
                <div onClick={() => {back();}} className="w-12 h-full flex items-center justify-center">
                    <IconArrowLeft stroke={1.5}/>
                </div>
                <div className="flex flex-grow items-center gap-2">
                    <div className="h-12 w-12">
                        <Image
                            src="/profile.jpg"
                            width={100}
                            height={100}
                            alt="user"
                            className="w-full h-full object-cover ring-2 ring-green-400 rounded-full cursor-pointer"
                        />
                    </div>
                    <div>
                        <p className="text-white font-bold">Bapparaj</p>
                        <p className="text-gray-400 text-sm">last seen today at 7:28 pm</p>
                    </div>
                </div>
                <Button isIconOnly className="group bg-transparent">
                    <IconDotsVertical size={20} stroke={1.5} />
                </Button>
            </div>
            <div
                className="w-full h-full py-3 px-2 overflow-y-auto
                            [&::-webkit-scrollbar]:w-1
                            [&::-webkit-scrollbar-track]:rounded-full
                            [&::-webkit-scrollbar-track]:bg-gray-100
                            [&::-webkit-scrollbar-thumb]:rounded-full
                            [&::-webkit-scrollbar-thumb]:bg-gray-300
                            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
                            " >
                <Send message="hello fdf sdfjshadf sdfu hwert lsdkf lfksdf ldkf" time={new Date()} />
                <Send message="hello fdf sdfjshadf sdfu hwert lsdkf lfksdf ldkf" time={new Date()} isMe />
                <Send message="hello fdf sdfjshadf sdfu hwert lsdkf lfksdf ldkf" time={new Date()} />
                <Send message="hello fdf sdfjshadf sdfu hwert lsdkf lfksdf ldkf" time={new Date()} isMe />
                <Send message="hello fdf sdfjshadf sdfu hwert lsdkf lfksdf ldkf" time={new Date()} />
                <Send message="hello fdf sdfjshadf sdfu hwert lsdkf lfksdf ldkf" time={new Date()} isMe />
                <Send message="hello fdf sdfjshadf sdfu hwert lsdkf lfksdf ldkf" time={new Date()} />
                <Send message="hello fdf sdfjshadf sdfu hwert lsdkf lfksdf ldkf" time={new Date()} isMe />
                <Send message="hello fdf sdfjshadf sdfu hwert lsdkf lfksdf ldkf" time={new Date()} />
                <Send message="hello fdf sdfjshadf sdfu hwert lsdkf lfksdf ldkf" time={new Date()} isMe />
                <Send message="hello fdf sdfjshadf sdfu hwert lsdkf lfksdf ldkf" time={new Date()} />
                <Send message="hello fdf sdfjshadf sdfu hwert lsdkf lfksdf ldkf" time={new Date()} isMe />
            </div>
            <div className="w-full px-2">
                <form className="flex items-center justify-between gap-2">
                    <Input
                        fullWidth
                        placeholder="Type a message"
                        ref={e => e?.focus()}
                    />
                    <Button isIconOnly className="group">
                        <IconSend2 size={24} stroke={1.5} className="transition-transform duration-300 group-hover:-rotate-45" />
                    </Button>
                </form>
            </div>
        </div>
    );
}
