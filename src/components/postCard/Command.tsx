import { ModalHeader, ModalBody, ModalFooter, Input, Avatar, Button } from "@nextui-org/react";
import { IconLocation } from "@tabler/icons-react";

export default function Command() {
    return (
        <>
            <ModalHeader className="flex flex-col gap-1">Commands</ModalHeader>
            <ModalBody>
                <div className="w-full h-[550px] overflow-y-auto">
                    <Comment />
                    <Comment />
                    <Comment />
                </div>
            </ModalBody>
            <ModalFooter className="border-t-[1px] border-gray-200 dark:border-gray-700">
                <Avatar src="/newbg.jpeg" />
                <Input className="tracking-wider" placeholder="Drop Your Commentd...." />
                <Button isIconOnly variant="ghost" color={"success"}>
                    <IconLocation stroke={1.5}/>
                </Button>
            </ModalFooter>
        </>
    );
}

const Comment = () => {
    return (
        <div
            className="w-full h-auto flex flex-col items-start justify-between gap-2 p-2 border-b-[1px] border-gray-200 dark:border-gray-700">
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar src="/newbg.jpeg" />
                    <p className="text-sm tracking-wider">John Doe</p>
                </div>
                <div>
                    <p className="text-xs tracking-wider">1h</p>
                </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-[#1a1e22] rounded-lg">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate ut, tempora accusamus odio quisquam vero omnis. Rerum, reprehenderit. Ullam asperiores optio facere aliquid voluptate perspiciatis excepturi voluptatum aut, totam animi.
                Iste nulla iure reiciendis. Laudantium, itaque! Ad, nihil incidunt. Hic ipsam natus accusamus pariatur tempora, est cumque vel voluptatibus accusantium itaque a eum sed nihil ad necessitatibus id earum nesciunt?
            </div>
        </div>
    );
};