import { Button } from "@nextui-org/button";
import{ Avatar } from "@nextui-org/avatar";
import {useRouter} from "next/navigation";

export const UserData = () => {
    const router = useRouter();
    return (
        <div className="w-full h-auto px-5 py-2 flex border-b border-gray-800">
            <div className="w-fit cursor-pointer">
                <Avatar src={"/newbg.jpeg"} onClick={() => {
                    router.push("/profile?uid=1");
                }}/>
            </div>
            <div className="flex-grow px-5 flex items-center justify-center">
                <Button fullWidth className="justify-start tracking-wider" radius={"full"}>
                    What&apos;s on your mind, Jane?
                </Button>
            </div>
        </div>
    );
};
