import { useState } from "react";
import { IconSettings, IconSearch, IconMessage } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";
import {
    Modal,
    ModalContent,
    useDisclosure
} from "@nextui-org/modal";
import { SearchModel } from "../search";
import { SettingModel } from "../setting";
import { NotificationContainer } from "../notification";

const navigationData : {
    title: "Search" | "Setting" | "Notification";
    icon: any;
}[] = [
    {
        title: "Notification",
        icon: IconMessage
    },
    {
        title: "Search",
        icon: IconSearch
    },
    {
        title: "Setting",
        icon: IconSettings
    }
];

export const SettingNavigation = () => {
    const [modalState, setModalState] = useState<"Search" | "Setting" | "Notification">("Setting");

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <div className={"flex gap-2"}>
                {navigationData.map((item, index) => (
                    <Button
                        key={index}
                        onPress={() => { setModalState(item.title); onOpen(); }}
                        variant="flat"
                    >
                        <div className={"flex gap-2"}>
                            <item.icon stroke={1.5} />
                            <span className="text-medium">{item.title}</span>
                        </div>
                    </Button>
                ))}

            </div>
            <Modal backdrop="blur" isOpen={isOpen} size={modalState === "Search" ? "5xl" : "lg"} onClose={onClose} isDismissable={false}>
                <ModalContent>
                    {() => (modalState === "Search" ? <SearchModel /> : modalState === "Setting" ? <SettingModel /> : <NotificationContainer/>)}
                </ModalContent>
            </Modal>
        </>
    );
};
