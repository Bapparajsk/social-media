"use client";

import {FormLayout, Inputs} from "./FormLayout";
import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import React, {useState} from "react";

export const FormComponent = ({state} : { state: "login" | "register" }) => {
    const [isMainError, setIsMainError] = useState<string | null>(null);

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
        },
        onError: (error) => {
            console.log("got to error", error);
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

            setIsMainError("An error occurred, please try again later.");
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
        </div>
    );
};
