"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconHeart, IconHeartFilled, IconMessage2, IconShare, IconTrash } from "@tabler/icons-react";
import {
    Modal,
    ModalContent,
    useDisclosure,
    Button,
    User,
    Image
} from "@nextui-org/react";

import CommandComponent from "./Command";
import ShareComponent from "./Share";

export const Card = ({
    id,
    title,
    isOwner,
    postImage,
    author,
    createdAt,
    isLiked,
    likes,
    onLike,
    commandCount,
}: {
    author: {
        _id: string,
        name: string,
        profilePicture :null| string,
    };
    title?: string;
    isOwner?: boolean;
    id?: string | undefined;
    postImage?: string | undefined;
    createdAt?: Date;
    isLiked?: boolean;
    likes: number;
    onLike?: (id: string | undefined) => void;
    commandCount?: number;
}) => {

    const [modalState, setModalState] = useState<"command" | "share">();
    const [postLikes, setPostLikes] = useState(likes);
    const [commandCountState, setCommandCountState] = useState(commandCount || 0);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const router = useRouter();

    const handleModal = (state: "command" | "share") => {
        setModalState(state);
        onOpen();
    };

    const HandleClickLike = async () => {
        if (onLike) {
            onLike(id);
            setPostLikes((prev) => {
                if (isLiked) {
                    return prev - 1;
                } else {
                    return prev + 1;
                }
            });
        }
    };

    const handleCommand = () => {
        setCommandCountState((prev) => prev + 1);
    };

    return (
        <>
            <div className="w-full mx-auto rounded-md shadow-md overflow-hidden flex flex-col p-2 mb-3 border-b-[2px] border-gray-200">
                <div className="w-full h-auto flex flex-col">
                    <div className="w-full h-auto flex items-center justify-between gap-2 pb-2">
                        <User
                            name={<div className="flex gap-2 text-sm tracking-wider">
                                <p>{author?.name} {createdAt && new Date(createdAt).toDateString()} {!isOwner && ":" }</p>
                                <p className="text-blue-400 cursor-pointer font-bold">{!isOwner && "Follow"}</p>
                            </div>}
                            description="Software Engineer"
                            avatarProps={{
                                src: "/newbg.jpeg",
                                alt: "John Doe",
                                className: "border-[2px] border-green-400 cursor-pointer",
                                onClick: () => {
                                    if (author?._id) router.push(`/profile?uid=${author._id}`);
                                },
                            }}
                        />
                        {isOwner && <div className="h-full flex items-center justify-center">
                            <Button isIconOnly variant={"ghost"} size="sm" color="danger">
                                <IconTrash stroke={1.5} size={18}/>
                            </Button>
                        </div>}
                    </div>
                    <div className="w-full">
                        <pre className={"whitespace-pre-line text-sm lg:text-base"}>
                            {title}
                        </pre>
                    </div>
                </div>
                <div className="w-[100%] h-auto relative">
                    <Image
                        src={postImage || "/newbg.jpeg"}
                        alt={title || "post image"}
                        width={1200}
                        loading="eager"
                    />
                </div>
                <div className="w-full h-auto flex items-center justify-center">
                    <div className="w-full h-auto flex items-center justify-between gap-2 py-2">
                        <Button 
                            onPress={HandleClickLike}
                            variant="ghost" 
                            fullWidth>
                            <span className="font-bold">{postLikes}</span>
                            {isLiked ? <IconHeartFilled stroke={1.5} /> : <IconHeart stroke={1.5} />}
                            
                        </Button>
                        <Button variant="ghost" fullWidth onPress={() => handleModal("command")}>
                            <span className="font-bold">{commandCountState}</span>
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
                        <CommandComponent id={id} onCommand={handleCommand}/>
                    ) : (
                        <ShareComponent/>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
