import { Card, CardFooter, Skeleton } from "@nextui-org/react";

export default function SkeletonFriendCard({ count = 1 }: { count?: number }) {
    return (
        <>
            {[...Array(count)].map((_, idx) => (
                <SkeletonFriendCardTemplate key={idx} />
            ))}
        </>
    );
}

const SkeletonFriendCardTemplate = () => {
    return (
        <Card className="w-72 h-72">
            <div className="w-full h-full">
                <Skeleton className="w-full h-full rounded-md" />
            </div>
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                <div>
                    <Skeleton className="w-20 h-4 rounded-md" />
                    <Skeleton className="w-20 h-4 rounded-md" />
                </div>
                <Skeleton className="w-20 h-4 rounded-md" />
            </CardFooter>
        </Card>
    );
};