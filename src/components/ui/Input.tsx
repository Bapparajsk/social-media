"use client";
import {InputHTMLAttributes, forwardRef, useState, ComponentRef, ComponentPropsWithoutRef} from "react";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    isError?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, isError, type, ...props }, ref) => {
        const radius = 100; // change this to increase the rdaius of the hover effect
        const [visible, setVisible] = useState(false);

        const mouseX = useMotionValue(0);
        const mouseY = useMotionValue(0);

        function handleMouseMove({ currentTarget, clientX, clientY }: any) {
            const { left, top } = currentTarget.getBoundingClientRect();
            mouseX.set(clientX - left);
            mouseY.set(clientY - top);
        }
        return (
            <motion.div
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
                            ${isError ? '#FF204E' : '#5AB2FF'},
                            transparent 80%
                        )`,
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                className="p-[2px] rounded-lg transition duration-300 group/input"
            >
                <input
                    type={type}
                    className={cn(
                        `flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
                        file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
                        focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
                        disabled:cursor-not-allowed disabled:opacity-50
                        dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
                        group-hover/input:shadow-none transition duration-400`,
                        isError && "dark:focus-visible:ring-[#FF6868] focus-visible:ring-[#FF6868]",
                        isError && "dark:text-red-500 text-red-500",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </motion.div>
        );
    }
);

const Label = forwardRef<
    ComponentRef<typeof LabelPrimitive.Root>,
    ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
    <LabelPrimitive.Root
        ref={ref}
        className={cn(
            "text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            className
        )}
        {...props}
    />
));

Label.displayName = LabelPrimitive.Root.displayName;
Input.displayName = "Input";

export { Input, Label };
