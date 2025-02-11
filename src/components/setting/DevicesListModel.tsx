import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
} from "@nextui-org/react";
import DevicesList from "./DevicesList";

export default function DevicesListModel({isOpen, onClose} : {isOpen: boolean, onClose: () => void}) {

    const { onOpenChange } = useDisclosure();

    return (
        <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange} onClose={onClose} isDismissable={false} backdrop="blur">
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <h5>Devices List</h5>
                            <p className="text-sm">Choose a device to connect</p>
                        </ModalHeader>
                        <ModalBody>
                            <DevicesList />
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
