import {
    ModalHeader,
    ModalBody,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import { IconDotsVertical, IconSearch, IconSend2 } from "@tabler/icons-react";
import ChatUserItem from "./ChatUserItem";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Send from "./Send";

export default function ChatContainerModel() {

    return (
        <>
            <ModalHeader>
                Chats
            </ModalHeader>
            <ModalBody>
                <div className="w-full max-h-[70vh] flex">
                    <div className="w-2/5 h-full">
                        <div>
                            <Input
                                startContent={<IconSearch stroke={1.5} size={20} />}
                                endContent={<Spinner size="sm" color="success" />}
                                fullWidth
                                placeholder="Search"
                            />
                        </div>
                        <div
                            className="w-full h-[64vh] overflow-y-auto mt-3
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
                    <div className="w-3/5 h-[70vh] flex flex-col">
                        <div className="w-full h-20 bg-[#141414] flex items-center justify-between rounded-lg px-5">
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
                                <IconDotsVertical size={20} stroke={1.5}/>
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
                            <Send  message="hello fdf sdfjshadf sdfu hwert lsdkf lfksdf ldkf" time={new Date()}/>
                            <Send  message="hello fdf sdfjshadf sdfu hwert lsdkf lfksdf ldkf" time={new Date()} isMe/>
                            <Send  message="hello fdf sdfjshadf sdfu hwert lsdkf lfksdf ldkf" time={new Date()}/>
                            <Send  message="hello fdf sdfjshadf sdfu hwert lsdkf lfksdf ldkf" time={new Date()} isMe/>
                            <Send  message="hello fdf sdfjshadf sdfu hwert lsdkf lfksdf ldkf" time={new Date()}/>
                            <Send  message="hello fdf sdfjshadf sdfu hwert lsdkf lfksdf ldkf" time={new Date()} isMe/>
                            <Send  message="hello fdf sdfjshadf sdfu hwert lsdkf lfksdf ldkf" time={new Date()}/>
                            <Send  message="hello fdf sdfjshadf sdfu hwert lsdkf lfksdf ldkf" time={new Date()} isMe/>
                            <Send  message="hello fdf sdfjshadf sdfu hwert lsdkf lfksdf ldkf" time={new Date()}/>
                            <Send  message="hello fdf sdfjshadf sdfu hwert lsdkf lfksdf ldkf" time={new Date()} isMe/>
                            <Send  message="hello fdf sdfjshadf sdfu hwert lsdkf lfksdf ldkf" time={new Date()}/>
                            <Send  message="hello fdf sdfjshadf sdfu hwert lsdkf lfksdf ldkf" time={new Date()} isMe/>
                        </div>
                        <div className="w-full pl-5">
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
                </div>
            </ModalBody>
        </>
    );
}
