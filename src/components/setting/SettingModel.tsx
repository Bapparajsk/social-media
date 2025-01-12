import { ModalBody, ModalHeader } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { IconLockPassword } from "@tabler/icons-react";

export default function SettingModel() {
    return (
        <>
            <ModalHeader>
                Setting
            </ModalHeader>
            <ModalBody>
                <div className="w-full h-auto flex gap-2">
                    <div className="w-full h-auto">
                        <p>Security</p>
                        <div className="w-full flex flex-col gap-2">
                            <Button color="primary" variant="shadow" startContent={<IconLockPassword stroke={1.5}/>}> Change Password </Button>
                        </div>
                    </div>
                    <div className="w-full h-10">
                    </div>
                </div>
            </ModalBody>
        </>
    );
}
