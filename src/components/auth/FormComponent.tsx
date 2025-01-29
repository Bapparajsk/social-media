"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { FormLayout, Inputs } from "./FormLayout";
import OtpModal from "@/components/ui/otpModal";

import { login, verifyLoginOtp, registerServer, loginErrorSet, registerErrorSet, verifyRegisterOtp } from "@/lib/auth";
import { isAxiosError } from "axios";




export const FormComponent = ({ state }: { state: "login" | "register" }) => {
    const [isMainError, setIsMainError] = useState<string | null>(null);
    const [tempToken, setTempToken] = useState<string | null>(null);

    const [otpState, setOtpState] = useState({
        isOpen: false,
        isError: false,
        errorMessage: "",
    });
    
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm<Inputs>();
    const onsubmit = (data: Inputs) => {
        mutate(data);
    };

    const { mutate, isPending } = useMutation({
        mutationKey: ["login"],
        mutationFn: async (data: Inputs) => {
            if (state === "login") {
                const res = await login(data.email, data.password);
                return {fnMessage: "login", ...res};
            } else {
                if (data.name === undefined) {
                    throw new Error("Name is required");
                }
                const res = await registerServer(data.name, data.email, data.password);
                return {fnMessage: "register", ...res};
            }
        },
        onSuccess: (data) => {
            if (data.fnMessage === "register") {
                setOtpState(prev => ({...prev, isOpen: true}));
                return;
            }

            if (data?.message === "Two Factor Authentication is enabled") {
                setTempToken(data.tempToken);
                setOtpState(prev => ({...prev, isOpen: true}));
                return;
            }
            router.push("/");
        },
        onError: (error) => {
            if (state === "login") {
                loginErrorSet(error, { clearErrors, setIsMainError, setError });
                return;
            }

            registerErrorSet(error, { clearErrors, setIsMainError, setError });
        }
    });

    const verifyOtp = async (otp: string) => {
        try {
            if (state === "login") {
                if (!tempToken) {
                    return;
                }
                await verifyLoginOtp(tempToken, otp);
            } else {
                await verifyRegisterOtp(otp);
            }
            router.push("/");
            
        } catch (error) {

            if(!isAxiosError(error)) {
                setOtpState(prev => ({...prev, isError: true, errorMessage: "An error occurred, please try again later."}));
                return;
            }
            
            const { response } = error;
            setOtpState(prev => ({...prev, isError: true, errorMessage: response?.data.message || "An error occurred, please try again later."}));
        }
    };

    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-3xl cursor-pointer text-neutral-800 dark:text-neutral-200">
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
            <OtpModal
                isOpen={otpState.isOpen}
                setIsOpen={() => {
                    setOtpState(prev => ({...prev, isOpen: !prev.isOpen}));
                    if (state === "register") {
                        router.replace("/"); // redirect to home page
                    }
                }}
                onSubmit={verifyOtp}
                isError={otpState.isError}
                errorMessage={otpState.errorMessage}
                resendOtp={() => {
                    // if
                }}
            />
        </div>
    );
};
