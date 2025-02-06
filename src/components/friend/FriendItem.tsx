import { Card, Image, Button, CardFooter } from "@nextui-org/react";
import { IconChecks, IconPlus, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { friendMutation } from "@/lib/friend";
import { useNotification } from "@/contexts/notification.context";
import { useState } from "react";

export default function FriendItem({
    id,
    name,
    title,
    profileImage,
    ref,
    env,
}: {
    id?: string | undefined;
    name?: string | undefined;
    title?: string | undefined;
    profileImage?: string | undefined;
    ref?: any;
    env: "friends" | "friend-requests" | "suggestions";
}) {

    const router = useRouter();
    const { show: notification } = useNotification();
    const [isSuccess, setIsSuccess] = useState(false);

    const {isPending, mutate} = useMutation({
        mutationKey: [env, id],
        mutationFn: async ({id, fn = false}:{id: string | undefined, fn?: boolean}) => {

            if (!id) {
                throw new Error("Invalid user id");
            }

            let key: "send-request" | "accept-request" | "reject-request" | "remove-friend" = "send-request";

            switch (env) {
                case "friends":
                    key = "remove-friend";
                    break;
                case "friend-requests":
                    key = "accept-request";
                    break;
                case "suggestions":
                    key = "send-request";
                    break;
            }

            if (fn) {
                key = "reject-request";
            }

            return await friendMutation({id, key});
        },
        onSuccess: (data) => {
            console.log(data);
            notification(data, "success");
            setIsSuccess(true);
        },
        onError: (error) => {
            console.log(error);
            if (!isAxiosError(error)) {
                notification(error.message || "An error occurred" ,"error");
                return;
            }
            
            const { response } = error;
            notification(response?.data?.message || "An error occurred", "error");
        },
    });

    return (
        <Card ref={ref} isFooterBlurred className="w-72 h-72">
            <div 
                className="w-full h-full relative"
                onClick={() => id && router.push(`/profile?uid=${id}`)}
            >
                <Image
                    removeWrapper
                    alt="Card example background"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover cursor-pointer"
                    src={profileImage || "/newbg.jpeg"}
                    isBlurred
                    isZoomed
                />
                {env === "friend-requests" && (
                    <div className="absolute top-2 right-2">
                        <Button
                            size="sm" 
                            isIconOnly 
                            variant="shadow" 
                            color="danger"
                            onPress={() => {
                                mutate({id, fn: true});
                            }}
                        >
                            <IconX size={16} stroke={1.5}/>
                        </Button>
                    </div>
                )}
            </div>
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                <div>
                    <p className="text-black text-medium">{name || "@John"}</p>
                    <p className="text-black/50 text-tiny">{title || "Hay there"}</p>
                </div>
                <Button 
                    onPress={() => id && mutate({id})}
                    isLoading={isPending}
                    variant="shadow"
                    className="text-tiny" 
                    color={env === "friends" ? "default" : env === "friend-requests" ? "success" : "primary"}
                    radius="full" 
                    size="sm" 
                    endContent={isSuccess ? <IconChecks size={16} stroke={1.5}/> : <IconPlus size={16} stroke={1.5}/>}
                >
                    {env === "friends" ? "Unfriend" : env === "friend-requests" ? "Accept" : "Add"}
                </Button>
            </CardFooter>
        </Card>
    );
}
