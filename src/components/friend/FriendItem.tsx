import { Card, Image, Button, CardFooter } from "@nextui-org/react";
import { IconChecks, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { sendFriendRequest, acceptFriendRequest } from "@/lib/friend";
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
        mutationFn: async (id: string | undefined) => {

            let data: any;

            switch (env) {
                case "friends":
                    data = await sendFriendRequest(id);
                    break;
                case "friend-requests":
                    data = await acceptFriendRequest(id);
                    break;
                case "suggestions":
                    data = await sendFriendRequest(id);
                    break;
            }

            return data;
            
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
                className="w-full h-full"
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
            </div>
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                <div>
                    <p className="text-black text-medium">{name || "@John"}</p>
                    <p className="text-black/50 text-tiny">{title || "Hay there"}</p>
                </div>
                <Button 
                    onPress={() => id && mutate(id)}
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
