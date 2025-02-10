import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    InputOtp,
    InputOtpProps,
    Button
} from "@nextui-org/react";


const OTP_COUNTDOWN = 90;
const OTP_RESEND_COUNTDOWN = 30;
const OTP_LENGTH = 6;

export default function OtpModal({
    onSubmit,
    resendOtp,
    isOpen,
    setIsOpen,
    isError,
    errorMessage,
    inputProps,
}: {
    onSubmit: (otp: string) => void;
    resendOtp: () => void;
    isOpen: boolean;
    setIsOpen: () => void;
    isError: boolean;
    errorMessage: string;
    inputProps?: InputOtpProps;
}) {

    const [otp, setOtp] = useState<string>("");
    const [counter, setCounter] = useState<number | null>(OTP_COUNTDOWN);

    const { pending } = useFormStatus();

    useEffect(() => {
        setTimer();
    }, []);

    const setTimer = () => {
        const interval = setInterval(() => {
            setCounter((prev) => {
                if (prev === 0 || prev === null) {
                    clearInterval(interval);
                    return null;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const inSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(otp);
    };

    return (
        <Modal isDismissable={false} isOpen={isOpen} size={"sm"} onClose={() => {
            setIsOpen();
            setOtp("");
        }} backdrop="blur">
            <ModalContent>
                {() => (
                    <>
                        <form onSubmit={inSubmit}>
                            <ModalHeader className="flex flex-col gap-1">Verify otp</ModalHeader>
                            <ModalBody>
                                <div className="w-full flex flex-col items-center justify-center">
                                    <InputOtp
                                        ref={e => { if (e) e.focus(); }}
                                        isInvalid={isError}
                                        isRequired
                                        variant="flat"
                                        errorMessage={errorMessage}
                                        length={OTP_LENGTH}
                                        value={otp}
                                        onValueChange={setOtp}
                                        {...inputProps}
                                    />

                                    <div className="w-full">
                                        <p className="text-sm">
                                            Don&apos;t receive OTP? {counter === null ? (
                                                <span className="text-primary-500 cursor-pointer hover:underline" onClick={() => {
                                                    setCounter(OTP_RESEND_COUNTDOWN);
                                                    setTimer();
                                                    resendOtp();
                                                }}>Resend</span>
                                            ) : formatTime(counter)}</p>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button disabled={pending} type="submit" className="btn btn-primary">Verify</Button>
                            </ModalFooter>
                        </form>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
