import { Skeleton } from "@nextui-org/react";

export default function SkeletonPostCard({ count = 1 }: { count?: number }) {
    return (
        <div key={count} className="w-full mx-auto rounded-md shadow-md overflow-hidden flex flex-col p-2 mb-3 border-b-[2px] border-gray-200">
            <div className="w-full h-auto flex flex-col">
                <div className="w-full h-auto flex items-center justify-between gap-2 pb-2">
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-11 h-11 rounded-full" />
                        <div className="flex flex-col gap-1">
                            <Skeleton className="w-40 h-4 rounded-md" />
                            <Skeleton className="w-20 h-4 rounded-md" />
                        </div>
                    </div>
                    <Skeleton className="w-10 h-10 rounded-lg" />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <Skeleton className="w-52 h-4 rounded-md" />
                    <Skeleton className="w-72 h-4 rounded-md" />
                    <div className="flex gap-3">
                        <Skeleton className="w-32 h-4 rounded-md" />
                        <Skeleton className="w-32 h-4 rounded-md" />
                    </div>
                    <Skeleton className="w-60 h-4 rounded-md" />
                </div>
            </div>
            <div className="w-[100%] h-auto relative py-2">
                <Skeleton className="w-full h-[500px] rounded-md" />
            </div>
            <div className="w-full h-auto flex items-center justify-center">
                <div className="w-full h-auto flex items-center justify-between gap-2 pb-2">
                    <Skeleton className="w-full h-10 rounded-md" />
                    <Skeleton className="w-full h-10 rounded-md" />
                    <Skeleton className="w-full h-10 rounded-md" />
                </div>
            </div>
        </div>
    );
}
