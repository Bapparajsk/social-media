"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    InputOtp,
    Button
} from "@nextui-org/react";

import { FormLayout, Inputs } from "./FormLayout";

export const FormComponent = ({ state }: { state: "login" | "register" }) => {
    const [isMainError, setIsMainError] = useState<string | null>(null);
    const [otp, setOtp] = useState<string>("");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm<Inputs>();
    const onsubmit = (data: Inputs) => {
        mutate(data);
    };

    const { mutate, isPending } = useMutation({
        mutationKey: ["login"],
        mutationFn: async (data: Inputs) => {
            if (state === "login") {
                console.log(data); // handle login
            } else {
                console.log(data); // handle register
            }
        },
        onSuccess: () => {
            // handle success
            onOpen(); // open modal to verify otp
        },
        onError: (error) => {
            clearErrors();
            setIsMainError(null);
            if (!axios.isAxiosError(error)) {
                setIsMainError("An error occurred, please try again later.");
                return;
            }

            const { response } = error;

            if (response?.status === 401) {
                setError("email", { message: "Invalid email or password" });
                setError("password", { message: "Invalid email or password" });
                return;
            }

            if (response?.status === 500) {
                setIsMainError("An error occurred, please try again later.");
                return;
            }
            
            setIsMainError(error.message || "An error occurred, please try again later.");
        }
    });

    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-3xl text-neutral-800 dark:text-neutral-200">
                {state === "login" ? "Welcome Back 👋" : "Create an account 🚀"}
            </h2>
            {isMainError && (
                <div className="text-red-500 dark:text-red-400 text-medium font-medium my-4">
                    {isMainError}
                </div>
            )}
            <FormLayout
                register={register}
                errors={errors}
                handleSubmit={handleSubmit(onsubmit)}
                path={state}
                isPending={isPending}
            />
            <Modal isOpen={isOpen} size={"sm"} onClose={onClose} backdrop="blur">
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Verify otp</ModalHeader>
                            <ModalBody>
                                <OtpInputs otp={otp} setOtp={setOtp} />
                            </ModalBody>
                            <ModalFooter>
                                <Button onPress={onClose} className="btn btn-primary">Verify</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

const OtpInputs = ({
    otp,
    setOtp,
    resendOtp
}: {
    otp?: string;
    setOtp?: (otp: string) => void;
    resendOtp?: () => void;
}) => {

    const [counter, setCounter] = useState<number | null>(5);

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

    useEffect(() => {
        setTimer();
    }, []);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <InputOtp color={"default"} isInvalid={false} errorMessage={"Wrong otp"} variant={"underlined"} length={6} value={otp} onValueChange={setOtp} />
            <div className="w-full">
                <p className="text-sm">
                    Don&apos;t receive OTP? {counter === null ? (
                        <span className="text-primary-500 cursor-pointer hover:underline" onClick={() => {
                            setCounter(5);
                            setTimer();
                            // resendOtp && resendOtp();
                        }}>Resend</span>
                    ) : formatTime(counter)}</p>
            </div>
        </div>
    );
};