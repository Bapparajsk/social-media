import { Button } from "@nextui-org/react";
import { cn } from "@/lib/utils";

const getDate = (time: Date) => {

    const date = new Date(time);

    // return if the date is today return the time only else return the date and time time is 12 hours
    if (date.toDateString() === new Date().toDateString()) {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else {
        return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
};

const Send = (({ message, time, isMe, ref }: {
    message: string,
    time: Date,
    ref?: React.Ref<HTMLDivElement>,
    isMe?: boolean
}) => {
    return (
        <div ref={ref} className={cn("w-full flex", isMe ? "justify-end" : "justify-start")}>
            <Button
                color={isMe ? "success" : "secondary"}
                variant={"flat"}
                className={"max-w-60 h-auto py-3  flex justify-center items-center text-start"}
            >
                <p className="whitespace-normal break-words">{message}</p>
                <span
                    className={'text-[10px] text-default-500 translate-y-3 ml-1'}
                >
                    {getDate(time)}
                </span>
            </Button>
        </div>
    );
});


export default Send;