import { Checkbox, Button } from "@nextui-org/react";

import Devices from "./Devices";

export default function DevicesList() {
    return (
        <div className="w-full flex flex-col px-2">
            <div className="flex items-center justify-between mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">
                <p className="text-lg">
                    Devices
                </p>
                <Checkbox color="primary">
                    <span className="text-medium">Select All</span>
                </Checkbox>
            </div>
            <Devices 
                deviceName="Linux"
                loginDate={new Date()}
                onChecked={(checked, deviceName) => console.log(checked, deviceName)}
                type="apple"
                isSelect={true}
            />
            <Devices 
                deviceName="Linux"
                loginDate={new Date()}
                onChecked={(checked, deviceName) => console.log(checked, deviceName)}
                type="laptop"
                isSelect={false}
            />
            <Devices 
                deviceName="OnePlus"
                loginDate={new Date()}
                onChecked={(checked, deviceName) => console.log(checked, deviceName)}
                type="mobile"
                isSelect={false}
            />
            <div className="mt-3">
                <Button fullWidth color={"danger"} variant="shadow" isDisabled>Remove Selected</Button>
            </div>
        </div>
    );
}
