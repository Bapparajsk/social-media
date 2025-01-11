import { Card, Image, Button, CardFooter } from "@nextui-org/react";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function FriendItem({
    id,
    name,
    title,
    profileImage
}: {
    id?: string | undefined;
    name?: string | undefined;
    title?: string | undefined;
    profileImage?: string | undefined;
}) {

    const { push } = useRouter();

    return (
        <Card isFooterBlurred className="w-72 h-72">
            <div 
                className="w-full h-full"
                onClick={() => id && push(`/profile?uid=${id}`)}
            >
                <Image
                    removeWrapper
                    alt="Card example background"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover cursor-pointer"
                    src={profileImage || "/newbg.jpeg"}
                />
            </div>
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                <div>
                    <p className="text-black text-medium">{name || "@John"}</p>
                    <p className="text-black/50 text-tiny">{title || "Hay there"}</p>
                </div>
                <Button className="text-tiny" color="primary" radius="full" size="sm" endContent={<IconPlus size={16} />}>
                    Follow
                </Button>
            </CardFooter>
        </Card>
    );
}
