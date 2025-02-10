import { useState } from "react";
import { IconSettings, IconSearch } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";
import { usePathname } from "next/navigation";
import {
    Modal,
    ModalContent,
    useDisclosure
} from "@nextui-org/modal";
import { SearchModel } from "../search";
import { SettingModel } from "../setting";

export const SettingNavigation = () => {
    const [modalState, setModalState] = useState<"search" | "setting">("setting");

    const pathName = usePathname();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <div className={"flex gap-2"}>
                <Button 
                    onPress={() => {setModalState("search"); onOpen();}} 
                    variant={pathName.startsWith("/search") ? "shadow" : "flat"}
                >
                    <div className={"flex gap-2 lg:w-52 justify-between items-end"}>
                        <IconSearch stroke={1.5} />
                        <span className="flex-grow h-[1px] rounded-md bottom-0 underline bg-white hidden lg:block" />
                        <span className="text-medium">Search</span>
                    </div>
                </Button>
                <Button  
                    onPress={() => {setModalState("setting"); onOpen();}}
                    variant={pathName.startsWith("/setting") ? "shadow" : "flat"}
                >
                    <div className={"flex gap-2"}>
                        <IconSettings stroke={1.5} />
                        <span className="text-medium">Setting</span>
                    </div>
                </Button>
            </div>
            <Modal backdrop="blur" isOpen={isOpen} size={modalState === "setting" ? "lg" : "5xl"} onClose={onClose} isDismissable={false}>
                <ModalContent>
                    {() => (modalState === "search" ? <SearchModel /> : <SettingModel />)}
                </ModalContent>
            </Modal>
        </>
    );
};
