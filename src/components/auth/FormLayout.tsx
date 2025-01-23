import {FormEvent, ReactNode} from "react";
import { Input, Label } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import {
    IconBrandGithub,
    IconBrandGoogle, IconLogin2,
} from "@tabler/icons-react";
import {BottomGradient, LabelInputContainer} from "@/components/ui/Effects";
import {cn} from "@/lib/utils";

export type Inputs = {
    name?: string;
    email: string;
    password: string;
}

type RegisterFormProps = {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    path?: "register" | "login";
    register: UseFormRegister<Inputs>;
    errors: FieldErrors<Inputs>;
    isPending: boolean;
}

export function FormLayout({
    handleSubmit,
    path = "register",
    register,
    errors,
    isPending
}: RegisterFormProps) {
    const router = useRouter();

    return (
        <form className="my-8" onSubmit={handleSubmit}>
            {path === "register" && <LabelInputContainer key={"name"} className="mb-4 justify-start">
                <Label htmlFor="name">Full Name</Label>
                <Input
                    id="name"
                    placeholder="bappa"
                    type="text"
                    {...register("name", {
                        required: "This field is required",
                        minLength: {value: 3, message: "Name is too short"}
                    })}
                    isError={errors.name && true}
                />
                {
                    errors.name && (
                        <div className="text-red-500 pl-2 dark:text-red-400 text-sm font-medium">
                            {errors.name.message}
                        </div>
                    )
                }
            </LabelInputContainer>}
            <LabelInputContainer key={"email"} className="mb-4 justify-start">
                <Label htmlFor="email">Email Address</Label>
                <Input
                    id="email"
                    placeholder="bappa@code.com"
                    type="email"
                    {...register("email", {required: "This field is required"})}
                    isError={errors.email && true}
                />
                {
                    errors.email && (
                        <div className="text-red-500 pl-2 dark:text-red-400 text-sm font-medium">
                            {errors.email.message}
                        </div>
                    )
                }
            </LabelInputContainer>
            <LabelInputContainer key={"password"} className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    {...register("password", {required: "This field is required"})}
                    isError={errors.password && true}
                    {...errors.password && (
                        <div className="text-red-500 pl-2 dark:text-red-400 text-sm font-medium">
                            {errors.password.message}
                        </div>
                    )}
                />
            </LabelInputContainer>

            <div className={"flex flex-col gap-3"}>
                <Button disabled={isPending} key={"submit"} className={"justify-center"} type={"submit"} >
                    <span className="text-neutral-700 dark:text-neutral-300 text-medium font-bold">
                        {path === "register" ? "Create Account" : "Sign in"}
                    </span>
                    <IconLogin2 className="h-4 w-4 text-neutral-800 dark:text-neutral-300 font-bold"/>
                </Button>

                <Button
                    key={"login"}
                    disabled={isPending}
                    className={"justify-center"}
                    onClick={() => router.push(path === "register" ? "/login" : "/register")}
                >
                    <span className="text-neutral-700 dark:text-neutral-300 text-medium font-bold">
                        {path === "register" ? "Login" : "Create Account"}   &rarr;
                    </span>
                </Button>
            </div>

            <div
                className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full"/>

            <div className="flex flex-col space-y-4">
                <Button
                    key={"github"}
                    disabled={isPending}
                >
                    <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300"/>
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                        GitHub
                    </span>

                </Button>
                <Button
                    key={"google"}
                    disabled={isPending}
                >
                    <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300"/>
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                        Google
                    </span>
                </Button>
            </div>
        </form>
    );
}

function Button({
    children,
    className,
    type,
    onClick,
    disabled
}: {
    readonly children: ReactNode;
    readonly className?: string;
    type?: "submit" | "button";
    onClick?: () => void;
    disabled?: boolean;
}) {

    type = type || "button";

    return (
        <button
            className={cn(
                `relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]`,
                className,
                disabled && "cursor-not-allowed opacity-50"
            )}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
            <BottomGradient/>
        </button>
    );
}
