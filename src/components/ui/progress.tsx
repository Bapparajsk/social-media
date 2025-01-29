
import { MotionDiv, useSpring, MotionValue } from "@/components/motion";
import { Ref } from "react";

export const ProgressBar = ({ progress, ref }: {progress: MotionValue<number>, ref: Ref<HTMLDivElement>}) => {
    const progressX = useSpring(progress, { damping: 25, stiffness: 70 });
    
    return (
        <div ref={ref} className="w-[80%] h-3 bg-neutral-200 dark:bg-neutral-800 rounded-full">
            <MotionDiv 
                initial={{ width: 0 }}
                style={{ width:  progressX }}
                className="h-full bg-primary rounded-full" 
            />
        </div>

    );
};