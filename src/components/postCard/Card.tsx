"use client";

import { useState } from "react";
import { IconDotsVertical } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IconHeart, IconHeartFilled, IconMessage2, IconShare } from "@tabler/icons-react";
import {
    Modal,
    ModalContent,
    useDisclosure,
    Button,
    User,
} from "@nextui-org/react";

import CommandComponent from "./Command";
import ShareComponent from "./Share";

export const Card = ({
    id,
    title,
    isOwner,
    postImage,
}: {
    title?: string
    isOwner?: boolean
    id?: string | undefined
    postImage?: string | undefined
}) => {

    const [modalState, setModalState] = useState<"command" | "share">();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const router = useRouter();

    const handleModal = (state: "command" | "share") => {
        setModalState(state);
        onOpen();
    };

    return (
        <>
            <div className="w-full mx-auto rounded-md shadow-md overflow-hidden flex flex-col p-2 border-b-[2px] border-gray-200">
                <div className="w-full h-auto flex flex-col">
                    <div className="w-full h-auto flex items-center justify-between gap-2 pb-2">
                        <User
                            name={<div className="flex gap-2 text-sm tracking-wider">
                                <p>John Doe : </p>
                                <p className="text-blue-400 cursor-pointer font-bold">Follow</p>
                            </div>}
                            description="Software Engineer"
                            avatarProps={{
                                src: "/newbg.jpeg",
                                alt: "John Doe",
                                className: "border-[2px] border-green-400",
                                onClick: () => {
                                    if (id) router.push(`/profile?uid=${id}`);
                                },
                            }}
                        />
                        {isOwner && <div className="h-full flex items-center justify-center">
                            <Button isIconOnly variant={"ghost"}>
                                <IconDotsVertical stroke={1.5} />
                            </Button>
                        </div>}
                    </div>
                    <div className="w-full">
                        <pre className={"whitespace-pre-line text-sm lg:text-base"}>
                            {title}
                        </pre>
                    </div>
                </div>
                <div>
                    <Image
                        width={800}
                        height={800}
                        src={postImage || "/newbg.jpeg"}
                        alt="John Doe"
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>
                <div className="w-full h-auto flex items-center justify-center">
                    <div className="w-full h-auto flex items-center justify-between gap-2 py-2">
                        <Button variant="ghost" fullWidth>
                            <span className="font-bold">100K</span>
                            <IconHeart stroke={1.5} />
                        </Button>
                        <Button variant="ghost" fullWidth onPress={() => handleModal("command")}>
                            <span className="font-bold">7.2M</span>
                            <IconMessage2 stroke={1.5} />
                        </Button>
                        <Button variant="ghost" fullWidth onPress={() => handleModal("share")}>
                            <span className="font-bold">29.1B</span>
                            <IconShare stroke={1.5} />
                        </Button>
                    </div>
                </div>
            </div>
            <Modal 
                isOpen={isOpen} 
                size={modalState === "command" ? "3xl" : "md"} 
                onClose={onClose}
                backdrop={"blur"}
            >
                <ModalContent>
                    {() => modalState === "command" ? (
                        <CommandComponent/>
                    ) : (
                        <ShareComponent/>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
