import { FormEvent, useState } from "react";
import { ModalHeader, ModalBody, ModalFooter, Input, Avatar, Button } from "@nextui-org/react";
import { IconLocation } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {useFormStatus} from 'react-dom';
import axios from "axios";

import Server from "@/lib/axios";
import { useNotification } from "@/contexts/notification.context";
import { useUser } from "@/contexts/user.context";

export default function Command({ id, onCommand }: { id: string | undefined, onCommand: () => void }) {

    const [comment, setComment] = useState("");

    const { pending } = useFormStatus();
    const { show: showNotification } = useNotification();
    const { user } = useUser();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['comments', id],
        queryFn: async () => {
            if (!id) {
                return [];
            }
            const res = await Server.get(`/api/post/${id}/comments`);
            onCommand();
            return res.data.comments;
        },
        gcTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    });

    if (isLoading) {
        return (
            <div className="w-full h-[550px] flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="w-full h-[550px] flex items-center justify-center">
                <p>Error...</p>
            </div>
        );
    }

                    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Refactor comment: remove leading/trailing spaces and extra spaces between words
        const formattedComment = comment.trim().replace(/\s+/g, ' ');

        if (!formattedComment) {
            showNotification("Comment can't be empty", "error");
            return;
        }

        if (!user) {
            showNotification("You need to login to comment", "error");
            return;
        }

        if (user.verifyEmail === false) {
            showNotification("You need to verify your email to comment", "error");
            return;
        }

        try {
            data.put({
                userId: {
                    _id: user.userId,
                    name: user.name,
                    title: user.title,
                    profilePicture: user.profilePicture,
                },
                comment: formattedComment,
                createdAt: new Date(),
            });
            await Server.post(`/api/post/${id}/comment`, { comment: formattedComment });
            showNotification("Comment added successfully", "success");
        } catch (e) {

            if (!axios.isAxiosError(e)) {
                showNotification("Something went wrong", "error");
                return;
            }

            const { response } = e;

            showNotification(response?.data.message || "Something went wrong", "error");
        } finally {
            setComment("");
        }
    };

    return (
        <>
            <ModalHeader className="flex flex-col gap-1">Commands</ModalHeader>
            <ModalBody>
                <div className="w-full h-[550px] overflow-y-auto">
                    {data.slice().reverse().map((comment: any, idx: number) => (
                        <Comment key={idx} {...comment} />
                    ))}
                </div>
            </ModalBody>
            <ModalFooter className="border-t-[1px] border-gray-200 dark:border-gray-700">
                <form onSubmit={handleSubmit} className="w-full h-auto flex items-center justify-between gap-2 p-2"> 
                    <Avatar src="/newbg.jpeg" />
                    <Input
                        ref={e => e?.focus()}
                        className="tracking-wider"
                        placeholder="Drop Your Commend..." 
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        disabled={pending}
                    />
                    <Button 
                        isIconOnly 
                        type="submit" 
                        variant="ghost" 
                        color={"success"}
                        isLoading={pending}
                    >
                        {!pending && <IconLocation stroke={1.5} />}
                    </Button>
                </form>
            </ModalFooter>
        </>
    );
}

const Comment = ({
    userId,
    comment,
    createdAt,
}: {
    userId: {
        _id: string;
        name: string;
        title: string | null;
        profilePicture: string | null;
    },
    comment: string,
    createdAt: Date,
}) => {

    const router = useRouter();

    return (
        <div
            className="w-full h-auto flex flex-col items-start justify-between gap-2 p-2 border-b-[1px] border-gray-200 dark:border-gray-700">
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar
                        src={userId.profilePicture || "/newbg.jpeg"}
                        onClick={() => router.push(`/profile?uid=${userId._id}`)}
                        className="cursor-pointer"
                    />
                    <p className="text-sm tracking-wider">{userId.name}</p>
                </div>
                <div>
                    <p className="text-xs tracking-wider">
                        {new Date(createdAt).toDateString()}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-[#1a1e22] rounded-lg">{comment}</div>
        </div>
    );
};