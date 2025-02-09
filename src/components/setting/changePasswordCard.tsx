import { User } from '@/contexts/type.user';
import { Checkbox, Input, Button } from '@nextui-org/react';
import Link from 'next/link';
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from 'axios';
import { useForm } from "react-hook-form";

import Server from '@/lib/axios';
import { useNotification } from "@/contexts/notification.context";
import { useState } from 'react';

interface Inputs {
    oldPassword?: string;
    newPassword: string;
    confirmNewPassword: string;
}

interface OnChangeType {
    value: string;
    target: "oldPassword" | "newPassword" | "confirmNewPassword";
}

export default function ChangePasswordCard({user} : {user: User}) {

    const { show } = useNotification();
    const { register, handleSubmit, watch ,formState: { errors }, setError, clearErrors } = useForm<Inputs>();
    const [isShow, setIsShow] = useState(false);

    const onsubmit = (data: Inputs) => {
        mutate(data);
    };

    const { mutate, isPending } = useMutation({
        mutationKey: ["changePassword"],
        mutationFn: async ({oldPassword, newPassword, confirmNewPassword}: Inputs) => {
            const regex = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/";
            if (newPassword !== confirmNewPassword) {
                throw new Error("Passwords do not match");
            }
            if (!newPassword.match(regex)) {
                throw new Error("Password must contain at least one uppercase letter, one lowercase letter, one number and one special character");
            }
            const { data } = await Server.post("/api/user/update/password", {oldPassword, newPassword});
            return data.message;
        },
        onSuccess: (data) => {
            show(data, "success");
        },
        onError: (error) => {
            clearErrors();
            if (!isAxiosError(error)) {
                show(error.message || "An error occurred", "error");
                return;
            }

            const { response } = error;
            show(response?.data.message || "An error occurred", "error");
        }
    });

    function isValidPassword(pass: string) {
        if (pass.length < 6) {
            return "Password is too short";
        }
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!pass.match(regex)) {
            return "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character";
        }
        return null;
    }

    const checkPassword = ({ value, target }: OnChangeType) => {
        const isValid = isValidPassword(value);
        if (isValid) {
            setError(target, { message: isValid });
        } else {
            clearErrors(target);
        }
    };

    const onChange = ({ value, target }: OnChangeType) => {
        if (value === "") {
            setError(target, { message: "This field is required" });
            return;
        }
        if (target === "oldPassword" || target === "newPassword") {
            checkPassword({ value, target });
            return;
        }
        if (watch("newPassword") === value) {
            clearErrors('confirmNewPassword');
        } else {
            setError("confirmNewPassword", { message: "Passwords do not match" });
        }
    };

    return (
        <div className="border-b pb-2 border-gray-600">
            <form onSubmit={handleSubmit(onsubmit)} className='w-full flex flex-col gap-2'>
                {!user.isNewPassword && 
                    <Input 
                        type={isShow ? "text" : "password"} 
                        placeholder="Enter old password" 
                        {...register("oldPassword", {
                            required: "This field is required", 
                            minLength: {value: 6, message: "Password is too short"}
                        })}
                        isRequired
                        isInvalid={errors.oldPassword && true}
                        errorMessage={errors.oldPassword?.message}
                        onChange={(e) => onChange({value: e.target.value, target: "oldPassword"})}
                    />
                }
                <Input 
                    type={isShow ? "text" : "password"} 
                    placeholder="New password" 
                    {...register("newPassword", {
                        required: "This field is required", 
                        minLength: {value: 6, message: "Password is too short"}
                    })}
                    isRequired
                    isInvalid={errors.newPassword && true}
                    errorMessage={errors.newPassword?.message}
                    onChange={(e) => onChange({value: e.target.value, target: "newPassword"})}
                />
                <Input 
                    type={isShow ? "text" : "password"} 
                    placeholder="Confirm new password" 
                    {...register("confirmNewPassword", {
                        required: "This field is required", 
                        minLength: {value: 6, message: "Password is too short"}
                    })}
                    isRequired
                    isInvalid={errors.confirmNewPassword && true}
                    errorMessage={errors.confirmNewPassword?.message}
                    onChange={(e) => onChange({value: e.target.value, target: "confirmNewPassword"})}
                />
                <div className="w-full flex flex-row items-center justify-between gap-2">
                    <Checkbox color="primary" size="md" checked={isShow} onChange={() => setIsShow(!isShow)}>
                        Show Password
                    </Checkbox>
                    {!user.isNewPassword && <Link
                        href="/forgot-password"
                        className="text-medium tracking-tight font-mono relative group text-primary-500"
                    >
                        Forgot Password
                        <span
                            className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary-500 group-hover:w-full transition-all duration-300`}
                        />
                    </Link>}
                </div>
                <Button fullWidth variant="shadow" isLoading={isPending} color="primary">Change Password</Button>
            </form>
        </div>
    );
}
